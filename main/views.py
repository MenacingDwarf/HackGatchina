import datetime
import json
import time

import requests
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render

from .models import Sight
import pred
import re


def hello(request):
    if request.method == "GET":
        return JsonResponse({'text': 'hello'}, safe=False)


def route(request):
    places = json.loads(request.GET.get('places'))
    print(request.GET.get('cafe'))

    cafes = []
    cafe_location = []

    if request.GET.get('food'):
        # food = json.loads(request.GET.get('food'))
        food = request.GET.get('food')
        print(food)

        response = requests.get(
            'https://search-maps.yandex.ru/v1/?text={}&bbox=30.066693,59.546795~30.196469,59.602701&lang=ru_RU&apikey=925823c2-96c4-49ad-bb4a-fc036ba90c0f'.format(
                food))

        content = response.json()
        for i in content['features']:
            if "'" not in i['properties']['CompanyMetaData']['name']:
                cafes.append(i['properties']['CompanyMetaData']['name'])
                cafe_location.append(list(reversed(i['geometry']['coordinates'])))

        print(cafes)
        print(cafe_location)

    API_KEY = 'f829f73b-e5a2-4c8f-acd2-ed6e84a04a73'
    API_ROOT_ENDPOINT = 'https://courier.common.yandex.ru/vrs/api/v1'

    # Создайте тело запроса, включая склад, точки доставки, транспортное средство и настройки.
    payload = {
        'depot': {'id': 0, 'time_window': '07:00-23:59', 'point': {'lat': 59.55971, 'lon': 30.102793}},
        'locations': [],
        'vehicle': {'id': 0},
        'options': {'time_zone': 3}
    }

    names = []
    locations = []

    if request.GET.get('cafe'):
        cafe = json.loads(request.GET.get('cafe'))
        print(cafe)
        #names.append(cafe['name'])
        #locations.append(cafe['coords'])
        places.append({'name':cafe['name'], 'lat':cafe['coords'][0], 'lon':cafe['coords'][1]})
        cafes.remove(places[-1]['name'])
        cafe_location.remove([places[-1]['lat'], places[-1]['lon']])

    print(payload)
    print(names)
    print(locations)

    for i, place in enumerate(places):
        payload['locations'].append(
            {'id': i + 1, 'time_window': '09:00-20:00', 'point': {'lat': place['lat'], 'lon': place['lon']}})
        names.append(place['name'])
        locations.append([place['lat'], place['lon']])

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
                names.insert(0, 'Вокзал')
                locations.insert(0, [59.55971, 30.102793])
                print('-------------')
                print(names)
                print(locations)
                print('-------------')
                return render(request, 'map.html',
                              {'names': names, 'points': locations, 'order': ids, 'cafe_location': cafe_location,
                               'cafes': cafes})
                # JsonResponse({'names': names, 'points': locations, 'order': ids})

    return JsonResponse({})


def build(request):
    ids = [0, 1, 2]
    location = [[59.55971, 30.102793], [59.567352, 30.100999], [59.56954, 30.11393]]
    names = ["Вокзал", "Гей парад", "Калич"]

    response = requests.get(
        'https://search-maps.yandex.ru/v1/?text=Бургеры&bbox=30.066693,59.546795~30.196469,59.602701&lang=ru_RU&apikey=925823c2-96c4-49ad-bb4a-fc036ba90c0f')

    content = response.json()
    cafes = []
    cafe_location = []
    for i in content['features']:
        if "'" not in i['properties']['CompanyMetaData']['name']:
            cafes.append(i['properties']['CompanyMetaData']['name'])
            cafe_location.append(list(reversed(i['geometry']['coordinates'])))
        else:

            print('мда')

    print(cafes)
    print(cafe_location)

    return render(request, 'map.html',
                  {'ids': ids, 'location': location, 'names': names, 'cafes': cafes, 'cafe_location': cafe_location})


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
    return JsonResponse({})


def vector(request):
    info = json.loads(request.GET.get('info'))
    accepted = json.loads(request.GET.get('accepted'))
    cancelled = json.loads(request.GET.get('cancelled'))
    n = norm(list(info.values()))
    if n != 0:
        for key in info:
            info[key] /= n
    if len(cancelled) != 0:
        for key in cancelled:
            info[key] -= cancelled[key] / 2.53
            if info[key] < 0:
                info[key] = 0
    objects = Sight.objects.all()
    priority = defaultdict(list)
    for obj in objects:
        obj.categories = obj.categories.replace('\'', '"')
        obj.save()
        cur = json.loads(obj.categories)
        if obj.id not in accepted:
            priority[np.dot(np.array(list(cur.values())), np.array(list(info.values())))].append(obj)
    res = []
    for key in sorted(priority.keys()):
        res += priority[key]

    return JsonResponse({"sights": serializers.serialize("json", reversed(res), ensure_ascii=False), "info": info})


def food(request):
    product = request.GET.get('product')

    response = requests.get(
        'https://search-maps.yandex.ru/v1/?text=Бургеры&bbox=30.066693,59.546795~30.196469,59.602701&lang=ru_RU&apikey=925823c2-96c4-49ad-bb4a-fc036ba90c0f')

    content = response.json()
    cafes = []
    cafe_location = []
    for i in content['features']:
        if "'" not in i['properties']['CompanyMetaData']['name']:
            cafes.append(i['properties']['CompanyMetaData']['name'])
            cafe_location.append(list(reversed(i['geometry']['coordinates'])))
        else:

            print('мда')

    return HttpResponse('lol')


def predict(request):
    print(request.GET.get('text'))

    response = requests.get('https://ru.wikipedia.org/wiki/{}'.format(request.GET.get('text')))

    result = re.search(r'<a href=".+" class="image"', response.text)
    print(result.group(0))
    image = re.search(r':.+" ', result.group(0))
    image = image.group(0)[1:-2]
    print(image)


    answer = pred.prediction(request.GET.get('text'))
    print(answer)
    return JsonResponse({'answer': list(answer)})
