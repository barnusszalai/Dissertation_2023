import json
import datetime
import sys
import requests
import boto3
import secrets
import string

def generate_random_string(length):
    characters = string.ascii_letters + string.digits
    random_string = "".join(secrets.choice(characters) for _ in range(length))
    return random_string

def decimal_hours_to_time_string(decimal_hours):
    hours = int(decimal_hours)
    minutes = int((decimal_hours - hours) * 60)
    seconds = int(((decimal_hours - hours) * 60 - minutes) * 60)
    return f"{hours:02d}:{minutes:02d}:{seconds:02d}"
    

def handler(event, context):
    
    dynamodb = boto3.resource('dynamodb')
    
        
    teamsTable = dynamodb.Table('Team-vg5swodsivcijoy773hlqnxvta-staging')
    
    teamItems = teamsTable.scan()['Items']
    teamIds = [item['id'] for item in teamItems]
    print(teamIds)
    
    #teamIds = ['ef29a34a-159e-4a9d-8bc1-20a012f81df4']

    current_time = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    
    scheduledMeetingsTable = dynamodb.Table('ScheduledMeeting-vg5swodsivcijoy773hlqnxvta-staging')
    
    userMRequestsTable = dynamodb.Table('UserScheduledMeeting-vg5swodsivcijoy773hlqnxvta-staging')
    
    userMeetingsTable = dynamodb.Table('UserMeeting-vg5swodsivcijoy773hlqnxvta-staging')
    
    meetingTable = dynamodb.Table('Meeting-vg5swodsivcijoy773hlqnxvta-staging')
    
    
    for teamId in teamIds:
    
        scheduledMeetingsResponse = scheduledMeetingsTable.scan(
            FilterExpression=boto3.dynamodb.conditions.Key('teamID').eq(teamId)
        )['Items']
        #print(scheduledMeetingsResponse)
        
        meetings = []
        participants = []
        hasToBeScheduledTodayRequestIds = []
        
        for item in scheduledMeetingsResponse:
            #invitedUsers = [userMeeting['userId'] for userMeeting in userMeetings if userMeeting['scheduledMeetingId'] == item['id']]
            date_format = "%Y-%m-%d"
        
            if 'invites_by' in item:
                if item['invites_by'] != None:
                    date_str = item['invites_by']
                    earliest_date = item['earliest_date']
                    latest_date = item['latest_date']
                    earliest_date_obj = datetime.datetime.strptime(earliest_date, date_format).date()
                    latest_date_obj = datetime.datetime.strptime(latest_date, date_format).date()
                    
                    
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
                        
                        #print(userMeetingsResponse)
                        meeting = {
                            'name': item['title'],
                            'day_interval': ((earliest_date_obj-today).days, (latest_date_obj-today).days),
                            'duration' : 30, 
                            'invitedParticipants': invitedUsers,
                        }
                        print(meeting['day_interval'])
                        
                        invitedParticipants = []
                        
                        for userId in invitedUsers:
                            participant = {
                                'name': userId,
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
                        #print(item)
                        # itemToDelete = {
                        #     '_version': 1,
                        #     'id': 'f386862a-4fe6-4a4b-9202-cf39607ae466',
                        # }
                        # deleteResponse = scheduledMeetingsTable.delete_item(Key=itemToDelete)
            
            # allParticipants |= set(invitedUsers)
        pTable = dynamodb.Table('User-vg5swodsivcijoy773hlqnxvta-staging')
        membershipTable = dynamodb.Table('Membership-vg5swodsivcijoy773hlqnxvta-staging')
        
        allParticipants = []
        for p in participants:
            participantResponse = pTable.get_item(Key={'id' : p['name']})['Item']
            #print(participantResponse)
            newParticipant = {
                'name': p['name'],
                'availableDays': [],
                'importance': 2,
                'preferred_time_of_day': participantResponse['preferred_time_of_day'],
                'unavailableSlots': []
            }
            allParticipants.append(newParticipant)
    
        # print(len(meetings))
        # print(len(participants))
        
        resultingFinalMeetings = {}
        
        data_to_pass_api = {
            "participants": allParticipants,
            "meetings": meetings
        }
        url = "http://prj-backend.herokuapp.com/testapi/meetingrequest/"
        response = requests.put(url, json=data_to_pass_api)
        
        generatedTeamMeetings = response.json()["data"]["result"]
        print(generatedTeamMeetings)
        
        current_date = datetime.datetime.today().date()
        
        unique_meetings = []
        meeting_attendance = []
        for user in generatedTeamMeetings:
            name = user["name"]
            for meeting in user["meetings"]:
                # Check if the meeting is already in unique_meetings
                if not any([m["title"] == meeting["id"] for m in unique_meetings]):
                    meeting_date = current_date + datetime.timedelta(days=meeting["day"])
                    meeting_date_iso = meeting_date.isoformat()
                    random_id = generate_random_string(20)
                    format_start = decimal_hours_to_time_string(meeting["start"])
                    format_end = decimal_hours_to_time_string(meeting["end"])
                    meetingObject = {
                        "id": random_id,
                        "title": meeting["id"],
                        "start_time": format_start,
                        "end_time": format_end,
                        "date": meeting_date_iso,
                        "teamID": teamId
                    }
                    userMeetingRandId = generate_random_string(20)
                    userMeetingObject = {
                        'id': userMeetingRandId,
                        'meetingId': random_id,
                        'userId': name,
                    }
                    
                    unique_meetings.append(meetingObject)
                    meetingResponse = meetingTable.put_item(Item=meetingObject)
                    userMeetingResponse = userMeetingsTable.put_item(Item=userMeetingObject)

                # Add membership for the user and the meeting
                meeting_attendance.append({
                    "name": name,
                    "meeting_id": meeting["id"],
                })

        #print("Unique Meetings:", unique_meetings)
        #print("Attendances:", meeting_attendance)
        
        
        # Remove the used ScheduledMeetings
        
        
        
        if response.status_code == 200:
            resultingFinalMeetings = response.json()["data"]
        else:
            print("Error:", response.status_code, response.text)
    
    
    body = {
      'message': resultingFinalMeetings
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