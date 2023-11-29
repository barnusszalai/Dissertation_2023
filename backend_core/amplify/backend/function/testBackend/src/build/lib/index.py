import json
import datetime
import sys
import requests
import boto3
    
    

def handler(event, context):

    current_time = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    
    dynamodb = boto3.resource('dynamodb')
    
    scheduledMeetingsTable = dynamodb.Table('ScheduledMeeting-vg5swodsivcijoy773hlqnxvta-staging')
    
    userMRequestsTable = dynamodb.Table('UserScheduledMeeting-vg5swodsivcijoy773hlqnxvta-staging')
    
    scheduledMeetingsResponse = scheduledMeetingsTable.scan(
        FilterExpression=boto3.dynamodb.conditions.Key('teamID').eq('ef29a34a-159e-4a9d-8bc1-20a012f81df4')
    )['Items']
    print(scheduledMeetingsResponse)
    
    meetings = []
    participants = []
    allParticipants = {}
    hasToBeScheduledTodayRequestIds = []
    
    for item in scheduledMeetingsResponse:
        #invitedUsers = [userMeeting['userId'] for userMeeting in userMeetings if userMeeting['scheduledMeetingId'] == item['id']]
        date_format = "%Y-%m-%d"
       
        if 'invites_by' in item:
            if item['invites_by'] != None:
                date_str = item['invites_by']
                date_obj = datetime.datetime.strptime(date_str, date_format).date()
                today = datetime.date.today()
            
                delta = date_obj - today
                if(today == date_obj):
                    hasToBeScheduledTodayRequestIds.append(item['id'])
                    
                    
                if(delta.days < 6):
                
                    userMeetingsResponse = userMRequestsTable.scan(
                        FilterExpression=boto3.dynamodb.conditions.Key('scheduledMeetingId').eq(item['id'])
                    )['Items']
                    invitedUsers = [userM['userId'] for userM in userMeetingsResponse]
                    
                    print(userMeetingsResponse)
                    meeting = {
                        'name': item['title'],
                        'day_interval': None,
                        'duration' : 30, 
                        'invitedParticipants': invitedUsers,
                    }
                    
                    invitedParticipants = []
                    
                    # Get invited users from DB
                    #
                    
                    for userId in invitedUsers:
                        participant = {
                            'name': userId,
                            # 'availableDays': [],
                            # 'importance': 2,
                            # 'preferred_time_of_day': "morning",
                            # 'unavailableSlots': []
                        }
                        invitedParticipants.append(participant)
                    
                    # Check if participant is in list
                    
                    for user in invitedParticipants:
                        found = False
                        for p in participants:
                            if p['name'] == user['name']:
                                found = True
                                break
                    
                        if not found:
                            participants.append(user)
                        
                    meetings.append(meeting)
        
        # allParticipants |= set(invitedUsers)
    pTable = dynamodb.Table('User-vg5swodsivcijoy773hlqnxvta-staging')
    for p in participants:
        participantResponse = pTable.get_item(Key={'id' : p['name']})
        print(participantResponse)
        newParticipant = {
            'name': p['name']
        }
    
    # print(len(meetings))
    # print(len(participants))
    
    # resultingFinalMeetings = {}
    
    # data_to_pass_api = {
    #     "participants": participants,
    #     "meetings": meetings
    # }
    # url = "http://localhost:8000/testapi/meetingrequest/"
    # response = requests.put(url, json=data_to_pass_api)
    
    # if response.status_code == 200:
    #     resultingFinalMeetings = response.json()["data"]
    # else:
    #     print("Error:", response.status_code, response.text)
    
    
    body = {
      'message': "asd"
    }
  
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps(body)
    }