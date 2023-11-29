# urls.py
from django.urls import path
from .views import MeetingRequestApiView
from .views import BasicMeetingRequestApiView
from .views import GreedyMeetingRequestAPIView

urlpatterns = [
    path('meetingrequest/', MeetingRequestApiView, name='meetingrequest_api'),
    path('basic_meetingrequest/', BasicMeetingRequestApiView, name='bascic_meetingrequest_api'),
    path('greedy_meetingrequest/', GreedyMeetingRequestAPIView, name='greedy_meetingrequest_api'),
]