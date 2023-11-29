from ortools.sat.python import cp_model
import collections


def scheduleMeetings(meetingRequests, participants):
        
    model = cp_model.CpModel()
    print(meetingRequests)
    print(participants)
    
    availableTimes = {8, 9, 10, 11, 12, 13, 14}


    num_meetings = len(meetingRequests)
    num_participants = len(participants)

    all_meetings = range(num_meetings)
    all_participants = range(num_participants)



    meeting_participant_constraints = [ [0]*num_participants for i in range(num_meetings)]
    
    # Create a name-to-id dictionary from the participant_data list
    name_to_id = {participant['name']: participant['id'] for participant in participants}

    
    for index, meetingRequest in enumerate(meetingRequests):
        for participant_name in meetingRequest['invitedParticipants']:
            participant_id = name_to_id.get(participant_name)
            # participant has to be an ID
            meeting_participant_constraints[index][participant_id] = 1
    
    
    # meeting_participant_constraints[0][0] = 1 # Meeting 0 requires participant 0
    # meeting_participant_constraints[0][1] = 1 # Meeting 0 requires participant 1
    # meeting_participant_constraints[0][2] = 1 # Meeting 0 requires participant 2
    # meeting_participant_constraints[1][1] = 1 # Meeting 1 requires participant 1
    # meeting_participant_constraints[1][2] = 1 # Meeting 1 requires participant 2

    # meeting_participant_constraints[2][0] = 1 # Meeting 2 requires participant 0
    # meeting_participant_constraints[2][1] = 1 # Meeting 2 requires participant 1
    # meeting_participant_constraints[2][2] = 1 # Meeting 2 requires participant 2

    # meeting_participant_constraints[3][0] = 1 # Meeting 2 requires participant 0
    # meeting_participant_constraints[3][1] = 1 # Meeting 2 requires participant 1
    # meeting_participant_constraints[3][2] = 1 # Meeting 2 requires participant 2

    # meeting_participant_constraints[4][0] = 1 # Meeting 2 requires participant 0
    # meeting_participant_constraints[4][1] = 1 # Meeting 2 requires participant 1
    # meeting_participant_constraints[4][2] = 1 # Meeting 2 requires participant 2


    participant_unavailabilities = {}
    participant_importances = {}
    
    for p in participants:
        unavailableTimesTemp = []
        participant_importances[name_to_id.get(p['name'])] = p['importance']
        try:
            for unavailability in p['unavailableSlots']:
                hour, minute = unavailability['startTime'].split(':')
                hour_int = int(hour)
                unavailableTimesTemp.append(hour_int)
            participant_unavailabilities[name_to_id.get(p['name'])] = unavailableTimesTemp
        except KeyError:
            print('empty')
        

    # participant_unavailabilities[0] = [8]
    # participant_unavailabilities[1] = [11]
    #participant_unavailabilities[2] = [8] # Participant 2 is unavailable at time slots 10
    
    

    # participant_importances[0] = 2
    # participant_importances[1] = 0
    #participant_importances[2] = 3



    #meeting_time_constraints = [ [0]*num_meetings for i in range(num_meetings)]
    #meeting_time_constraints[0][0] = 1 # Meeting 0 requires time slot 0


    availabilities = {}

    # Generate All the True / False values for each meeting at each time slot given a participant
    for p in all_participants:
        for slot in availableTimes:
            for m in all_meetings:
                availabilities[(p, slot, m)] = model.NewBoolVar(f"availabilities_{p}_{slot}_{m}")
            
    # One participant can attend maximum one meeting at the same time (Should be a soft constraint)
    # for p in all_participants:
    #    for slot in availableTimes:
    #        model.AddAtMostOne(availabilities[(p, slot, m)] for m in all_meetings)


    for m in all_meetings:
        for p in all_participants:
            # Two participants have to attend the same meeting at the same time if they are both invited to the meeting
            # for m in all_meetings:
            if(meeting_participant_constraints[m][p] == 1):
                meetingOtherParticipants = [i for i, j in enumerate(meeting_participant_constraints[m]) if (j==1 and p!=i)]
                #print(meetingOtherParticipants)
                for op in meetingOtherParticipants:
                    for slot in availableTimes:
                        model.Add(availabilities[(op, slot, m)] == availabilities[(p, slot, m)])


            # Participants who are invited to the meeting, have to attend the meeting once during the week
            # If they are not invited, they cannot attend
            participant_invited = meeting_participant_constraints[m][p]
            model.Add(sum([availabilities[(p, slot, m)] for slot in availableTimes]) == participant_invited)

            # Participants can only attend one meeting at most once
            model.AddAtMostOne(availabilities[(p, slot, m)] for slot in availableTimes)
            
            # The number of meetings a participant has is exactly the same as the number of invites he has
            number_of_participant_invites = meeting_participant_constraints[m][p]
            model.Add(sum([availabilities[(p, slot, m)] for slot in availableTimes]) == number_of_participant_invites)
            
        
    # Organize the meetings as early in the week as possible
    # totalTimeSlot = 0
    # for p in all_participants:
    #     for slot in availableTimes:
    #         slotSum = sum([availabilities[(p, slot, m)] for m in all_meetings]) * slot
    #         totalTimeSlot += slotSum

            
    # Count the total number of empty slots across all participants
    total_collisions = 0
    participant_collisions = {}
    for p in all_participants:
        for slot in availableTimes:
            participant_collisions[(p, slot)] = (model.NewIntVar(0, len(meeting_participant_constraints), "obj_var"))
            
            # Sum the number of collisions for each participant at each time slot --> try to minimize it
            # Thus --> participants should attend as few meetings at a particular slot as possible
            # --> Prefferably 1 or None
            collisions = ([availabilities[(p, slot, m)] for m in all_meetings])
            #model.Add(participant_collisions[p] == collisions)
            #model.AddMultiplicationEquality(participant_collisions[(p, slot)], collisions)
            model.AddMaxEquality(participant_collisions[(p, slot)], collisions)


    # Minimize the total number of empty slots across all participants
    participant_collisions_sum = sum([participant_collisions[(p, slot)] for p in all_participants for slot in availableTimes])
    no_collision_with_current_weight = 3

    p_unavailability_penalty = model.NewIntVar(0, 100, 'p_unavailability_penalty')
    total_unavailability_penalty_sum = 0
    for p in all_participants:
            for meeting in all_meetings:
                try:
                    for index in range(len(participant_unavailabilities[p])):
                        p_unavailability_penalty = p_unavailability_penalty + (availabilities[(p, participant_unavailabilities[p][index], meeting)] * participant_importances[p])
                except Exception:
                    print("no previous calendar")
                    
    model.Add(p_unavailability_penalty == p_unavailability_penalty)
    no_collision_with_previous_weight = 4


    # Consider the importances of each meetings --> also consider
    # the meetings that the participants are already attending




    # Calculate the global objective, for the maximum expected utility with regards to
    # every stakeholder (participant, meetings, etc)
    penalized_objective = model.NewIntVar(0, 200, 'penalized_objective')
    model.Add(penalized_objective == (participant_collisions_sum * 5) - (p_unavailability_penalty * 2))


    previous_scheduled_slot_collisions = 0

    # Participant's who already have a meeting scheduled at a slot, cannot have a meeting scheduled for that slot
    # for p in participant_unavailabilities:
    #     for slot in participant_unavailabilities[p]:
    #         for m in all_meetings:
    #             model.Add(availabilities[p, slot, m] == 0)


    model.Maximize(penalized_objective)


    solver = cp_model.CpSolver()
    status = solver.Solve(model)
    print(solver.Value(p_unavailability_penalty))
    
    resultToReturn = {}
    
    returnAllMeetings = []
    for m in all_meetings:
        returnAllMeetings.append(f"M{m}")
    
    
    for p in all_participants:
        meetingH = {}
        for slot in availableTimes:
            meetingHappeningAggregator = []
            for m in all_meetings:
                if solver.Value(availabilities[(p, slot, m)]) == 1:
                    meetingHappeningAggregator.append(f"M{m}")
                    meetingH[f"{slot}:00"] = (f"M{m}")
            if slot in participant_unavailabilities[p]:
                meetingHappeningAggregator.append("X")
            meetingH[f"{slot}:00"] = meetingHappeningAggregator
            print(f"Participant {p}, Time slot {slot}, Meeting: {meetingHappeningAggregator}")
        resultToReturn[p] = meetingH
            
        
    print(resultToReturn)
    return (resultToReturn, returnAllMeetings)
