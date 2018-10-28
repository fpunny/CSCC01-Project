from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from DataFetching import models
from django.http import JsonResponse
from DataFetching import serializers

# Create your views here.
def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


class UploadFileViewSet(viewsets.ViewSet):

    def create(self, request):
        file = request.data['file']
        f = file.read()
        f1 = read('', 'w')

        models.CommunityConnect.objects.from_csv('/path/to/my/import.csv')



class GetCommunityData(viewsets.ViewSet):

    def __init__(self, requet):
        print('it goes to init here')

    def list(self, request):
        print(request)
        community_data = models.CommunityConnect.objects.filter()
        print(community_data)
        serializers_data = serializers.CommunityConnectSerializer(community_data, many=True)
        print(serializers_data)
        print(serializers_data.data)
        return JsonResponse({'community_data': serializers_data.data}, status=201)

    def create(self, request):

        community_data = models.CommunityConnect.objects.filter()
        serializers_data = serializers.CommunityConnectSerializer(community_data, many=True)
        return JsonResponse({'community_data': serializers_data.data}, status=201)