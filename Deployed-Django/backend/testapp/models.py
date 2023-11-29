from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.

class Todo(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)

    def _str_(self):
        return self.title
    
    
class Participant(models.Model):
    name = models.CharField(max_length=120)
    availableDays = ArrayField(models.BooleanField(default=False))
    blockedSlots = ArrayField(ArrayField(models.TimeField()))
    
    def _str_(self):
        return self.name
                                      
    
class MeetingRequest(models.Model):
    title = models.CharField(max_length=120)
    #invitedParticipants = models.ManyToManyField(Participant, related_name='events')
    
    def _str_(self):
        return self.title
    
