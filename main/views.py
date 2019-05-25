from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
import requests
import time
import datetime


def hello(request):
    if request.method == "GET":
        return JsonResponse({'text': 'hello'}, safe=False)


def route(request):
    API_KEY = 'f829f73b-e5a2-4c8f-acd2-ed6e84a04a73'
    API_ROOT_ENDPOINT = 'https://courier.common.yandex.ru/vrs/api/v1'

    # Создайте тело запроса, включая склад, точки доставки, транспортное средство и настройки.
    payload = {
        'depot': {'id': 0, 'time_window': '07:00-23:59', 'point': {'lat': 55.733777, 'lon': 37.588118}},
        'locations': [
            {'id': 1, 'time_window': '09:00-20:00', 'point': {'lat': 55.684872, 'lon': 37.595965}},
            {'id': 2, 'time_window': '15:00-20:00', 'point': {'lat': 55.739796, 'lon': 37.689102}},
            {'id': 3, 'time_window': '12:00-15:00', 'point': {'lat': 55.809657, 'lon': 37.520314}},
            {'id': 4, 'time_window': '09:00-15:00', 'point': {'lat': 55.744764, 'lon': 37.558224}},
            {'id': 5, 'time_window': '15:00-20:00', 'point': {'lat': 55.788563, 'lon': 37.670101}},
        ],
        'vehicle': {'id': 0},
        'options': {'time_zone': 3}
    }

    # Отправьте запрос и получите ID поставленной задачи.
    response = requests.post(
        API_ROOT_ENDPOINT + '/add/svrp',
        params={'apikey': API_KEY}, json=payload)

    print(response)
    return HttpResponse(response)

