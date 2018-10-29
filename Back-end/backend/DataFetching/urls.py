from django.urls import path
from . import views
from django.conf.urls import url, include
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets

# router = routers.DefaultRouter()
# router.register(r'get_data', views.GetCommunityData)

urlpatterns = [
    path('', views.index, name='index'),
    path('get_data', views.GetCommunityData, name='get_data')
]