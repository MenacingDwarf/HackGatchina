import datetime
import json
import time

import requests
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render

from .models import Sight


def hello(request):
    if request.method == "GET":
        return JsonResponse({'text': 'hello'}, safe=False)


def route(request):
    API_KEY = 'f829f73b-e5a2-4c8f-acd2-ed6e84a04a73'
    API_ROOT_ENDPOINT = 'https://courier.common.yandex.ru/vrs/api/v1'

    # Создайте тело запроса, включая склад, точки доставки, транспортное средство и настройки.
    payload = {
        'depot': {'id': 0, 'time_window': '07:00-23:59', 'point': {'lat': 59.55971, 'lon': 30.102793}},
        'locations': [
            {'id': 1, 'time_window': '09:00-20:00', 'point': {'lat': 59.567352, 'lon': 30.100999}},
            {'id': 2, 'time_window': '15:00-20:00', 'point': {'lat': 59.56954, 'lon': 30.11393}},
            # {'id': 3, 'time_window': '12:00-15:00', 'point': {'lat': 55.809657, 'lon': 37.520314}},
            # {'id': 4, 'time_window': '09:00-15:00', 'point': {'lat': 55.744764, 'lon': 37.558224}},
            # {'id': 5, 'time_window': '15:00-20:00', 'point': {'lat': 55.788563, 'lon': 37.670101}},
        ],
        'vehicle': {'id': 0},
        'options': {'time_zone': 3}
    }

    # Отправьте запрос и получите ID поставленной задачи.
    response = requests.post(
        API_ROOT_ENDPOINT + '/add/svrp',
        params={'apikey': API_KEY}, json=payload)

    # Дождитесь ответа.
    poll_stop_codes = {
        requests.codes.ok,
        requests.codes.gone,
        requests.codes.internal_server_error
    }

    # Опрос сервера о готовности результата оптимизации маршрута с использованием полученного ранее ID.
    if response.status_code == requests.codes.accepted:
        request_id = response.json()['id']
        poll_url = '{}/result/svrp/{}'.format(API_ROOT_ENDPOINT, request_id)

        response = requests.get(poll_url)
        while response.status_code not in poll_stop_codes:
            time.sleep(1)
            response = requests.get(poll_url)

        # Вывод информации в пользовательском формате.
        if response.status_code != 200:
            print('Error {}: {}'.format(response.text, response.status_code))
            return HttpResponse('что то сломалось')
        else:
            print('Route optimization completed')
            print('')

            for route in response.json()['result']['routes']:
                print('Vehicle {} route: {:.2f}km'.format(
                    route['vehicle_id'], route['metrics']['total_transit_distance_m'] / 1000))

                ids = []
                # Вывод маршрута в текстовом формате.
                for waypoint in route['route']:
                    print('  {type} {id} at {eta}, {distance:.2f}km driving '.format(
                        type=waypoint['node']['type'],
                        id=waypoint['node']['value']['id'],
                        eta=str(datetime.timedelta(seconds=waypoint['arrival_time_s'])),
                        distance=waypoint['transit_distance_m'] / 1000))
                    ids.append(waypoint['node']['value']['id'])

                # Вывод маршрута в формате ссылки на Яндекс.Карты.
                yamaps_url = 'https://yandex.ru/maps/?mode=routes&rtext='
                for waypoint in route['route']:
                    point = waypoint['node']['value']['point']
                    yamaps_url += '{}%2c{}~'.format(point['lat'], point['lon'])

                print('')
                print('See route on Yandex.Maps:')
                print(yamaps_url)

                print('Порядок ', ids)
                return HttpResponse('кажется что то работает')

    return HttpResponse('вообще хз что происходит')


def build(request):
    ids = [0, 1, 2]
    location = [[59.55971, 30.102793], [59.567352, 30.100999], [59.56954, 30.11393]]
    names = ["Вокзал", "Гей парад", "Калич"]

    return render(request, 'map.html', {'ids': ids, 'location': location, 'names': names})


from numpy.linalg import norm
import numpy as np
from collections import defaultdict
from django.core import serializers

def normalize(request):
    objects = Sight.objects.all()
    for obj in objects:
        cur = json.loads(obj.categories)
        n = norm(list(cur.values()))
        if n != 0:
            for key in cur:
                cur[key] /= n
        obj.categories = json.dumps(cur)
        obj.save()

def vector(request):
    info = json.loads(request.GET.get('info'))
    n = norm(list(info.values()))
    if n != 0:
        for key in info:
            info[key] /= n
    objects = Sight.objects.all()
    priority = defaultdict(list)
    for obj in objects:
        cur = json.loads(obj.categories)
        # for key in cur:
        #     cur[key] /= norm(list(cur.values()))
        # obj.categories = json.dumps(cur)
        # obj.save()
        priority[np.dot(np.array(list(cur.values())), np.array(list(info.values())))].append(obj)
    res = []
    for key in sorted(priority.keys()):
        res += priority[key]

    return HttpResponse(serializers.serialize("json", reversed(res), ensure_ascii=False))
