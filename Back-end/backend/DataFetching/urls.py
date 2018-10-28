from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('get_data', views.GetCommunityData, name='get_data')
]
