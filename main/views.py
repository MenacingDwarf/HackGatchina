from django.shortcuts import render
from django.http import JsonResponse


def hello(request):
    if request.method == "GET":
        return JsonResponse({'text': 'hello'}, safe=False)
