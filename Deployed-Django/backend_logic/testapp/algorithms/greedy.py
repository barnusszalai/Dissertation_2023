def scheduleGreedyMeetings(meeting_requests, participants):
    meeting_slots = [8, 9, 10, 11, 12, 13, 14]  # 8 AM to 2 PM
    scheduled_meetings = []

    # Convert input format to the format used by the existing algorithm
    formatted_meeting_requests = []
    for meeting in meeting_requests:
        participants_set = set(meeting['invitedParticipants'])
        formatted_meeting_requests.append((meeting['name'], participants_set))

    # Add the IDs to the participants' names
    name_to_id = {participant['name']: idx for idx, participant in enumerate(participants)}


    for meeting, meeting_participants in formatted_meeting_requests:
        min_overlap = float("inf")
        selected_slot = None

        # Count the total overlap if the meeting is placed in the slot
        for slot in meeting_slots:
            overlap = sum([1 for s, m, p in scheduled_meetings if p.intersection(meeting_participants) and s == slot])

            # If overlap is less than the best so far, use that
            if overlap < min_overlap:
                min_overlap = overlap
                selected_slot = slot

        scheduled_meetings.append((selected_slot, meeting, meeting_participants))

    result_to_return = {}

    for participant_name, participant_id in name_to_id.items():
        result_to_return[participant_id] = {f"{hour}:00": [] for hour in range(8, 15)}

    all_meetings = set()
    # Convert the result to the format expected by the front-end
    for time_slot, meeting, meeting_participants in scheduled_meetings:
        all_meetings.add(meeting)
        for participant in meeting_participants:
            participant_id = name_to_id[participant]
            result_to_return[participant_id][f"{time_slot}:00"].append(meeting)

    return (result_to_return, list(all_meetings))  # Convert all_meetings set to a list before returning



# Hard coded test inputs
# meeting_requests = [
#     {'name': 'M1', 'day_interval': None, 'duration': 30, 'invitedParticipants': ['Tom', 'Alice']},
#     {'name': 'M2', 'day_interval': None, 'duration': 30, 'invitedParticipants': ['Bob', 'Alice', 'Eve']},
#     {'name': 'M3', 'day_interval': None, 'duration': 30, 'invitedParticipants': ['Tom', 'Bob']},
# ]

# participants = {
#     'participants': [
#         # ... (use the same participants data as in the previous example)
#     ],
# }

# formatted_result, all_meetings = schedule_meetings(meeting_requests, participants)

# print(formatted_result)
# print(all_meetings)