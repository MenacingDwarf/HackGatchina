from django.urls import path
from . import views

urlpatterns = [
    path('', views.hello, name="hello"),
    path('route/', views.route, name="route"),
    path('build/', views.build, name="build"),
    path('vector/', views.vector, name="vector"),
    path('food/', views.food, name="food")
]
