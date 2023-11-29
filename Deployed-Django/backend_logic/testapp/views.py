from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import TodoSerializer, MeetingRequestSerializer
from .models import Todo, Participant, MeetingRequest
from django.http import HttpResponse
from ortools.sat.python import cp_model
from rest_framework import generics
import collections
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import sys
import os

from .algorithms.greedy import scheduleGreedyMeetings
from .algorithms.cp_solver import scheduleMeetings
from .algorithms.cp_interval import scheduleIntervalMeetings

#sys.path.insert(0, os.path.abspath('./algorithms'))

class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()
    
@csrf_exempt
def GreedyMeetingRequestAPIView(request):
    if request.method == 'PUT':
        data = json.loads(request.body)
        print("here")
        
        # Array of meeting objects
        meetingRequests = data['meetings']
        #print(data)
        
        # Array of participant objects
        participants = data['participants']
        
        for idx, item in enumerate(participants):
            item['id'] = idx
        print(meetingRequests)
        print(participants)
        (resultToReturn, returnAllMeetings) = scheduleGreedyMeetings(meetingRequests, participants)
        return JsonResponse({'data': {'result' : resultToReturn, 'allMeetings' : returnAllMeetings}})
    else:
        return JsonResponse({'error': 'Invalid request method'})

# Create your views here.
@csrf_exempt
def BasicMeetingRequestApiView(request):
    if request.method == 'PUT':
        data = json.loads(request.body)
        print("here")
        
        # Array of meeting objects
        meetingRequests = data['meetings']
        print(data)
        
        # Array of participant objects
        participants = data['participants']
        
        for idx, item in enumerate(participants):
            item['id'] = idx
            
        (resultToReturn, returnAllMeetings) = scheduleMeetings(meetingRequests, participants)
        return JsonResponse({'data': {'result' : resultToReturn, 'allMeetings' : returnAllMeetings}})
    else:
        return JsonResponse({'error': 'Invalid request method'})
    
@csrf_exempt
def MeetingRequestApiView(request):
    if request.method == 'PUT':
        data = json.loads(request.body)
        
        # Array of meeting objects
        meetingRequests = data['meetings']
        print(data)
        
        # Array of participant objects
        participants = data['participants']
        
        for idx, item in enumerate(participants):
            item['id'] = idx
            
        resultToReturn = scheduleIntervalMeetings(meetingRequests, participants)
        return JsonResponse({'data': {'result' : resultToReturn}})
    elif request.method == 'GET':
        resultToReturn = scheduleIntervalMeetings()
        all_meetings = ["M1", "M2", "M3", "M4", "M5"]
        return JsonResponse({'data': {'result' : resultToReturn}})
    
    else:
        return JsonResponse({'error': 'Invalid request method'})