from ortools.sat.python import cp_model
from datetime import time, datetime, timedelta
import random

def get_meeting_colors(meetings):
    meeting_colors = {}
    for meeting in meetings:
        r = random.randint(128, 255)
        g = random.randint(128, 255)
        b = random.randint(128, 255)
        meeting_colors[meeting] = f"#{r:02x}{g:02x}{b:02x}"
    return meeting_colors

class MeetingPrinter(cp_model.CpSolverSolutionCallback):
    def __init__(self, meeting_start_vars, meetings, participants, total_overlap, participant_overlaps, total_minutes):
        cp_model.CpSolverSolutionCallback.__init__(self)
        self._meeting_start_vars = meeting_start_vars
        self._meetings = meetings
        self._participants = participants
        self._total_overlap = total_overlap
        self._participant_overlaps = participant_overlaps
        self.best_solution = None
        self.best_overlap = float("inf")
        self._total_minutes = total_minutes

    def on_solution_callback(self):
        current_overlap = self.Value(self._total_overlap)
        if current_overlap < self.best_overlap:
            self.best_overlap = current_overlap
            self.best_solution = {meeting: self.Value(start_var) for meeting, start_var in self._meeting_start_vars.items()}

    def print_best_solution(self):
        if self.best_solution is None:
            print("No solution found.")
            return

        print(f'Total overlap (minutes): {self.best_overlap}')
        print('Scheduled meetings:')
        for participant, overlap in self._participant_overlaps.items():
            print(f'{participant}: {self.Value(overlap)} minutes')
        
        schedules = {participant: [] for participant in self._participants}
        for meeting, start_minutes in self.best_solution.items():
            day = start_minutes // self._total_minutes
            start_minutes_in_day = start_minutes % self._total_minutes
            start_datetime = datetime.combine(datetime.today(), time(8, 0)) + timedelta(minutes=start_minutes_in_day)
            end_datetime = start_datetime + timedelta(minutes=self._meetings[meeting]["duration"])
            start_time = start_datetime.time()
            end_time = end_datetime.time()

            for participant in self._meetings[meeting]["participants"]:
                schedules[participant].append((meeting, day, start_time, end_time))

        print("\nIndividual participants' schedules:")
        for participant, schedule in schedules.items():
            print(f'{participant}:')
            sorted_schedule = sorted(schedule, key=lambda x: (x[1], x[2]))
            for meeting, day, start, end in sorted_schedule:
                print(f'  {meeting}, day: {day + 1}, time: {start} - {end}')


                
    def get_result_data(self):
        if self.best_solution is None:
            return []

        result_data = []
        schedules = {participant: [] for participant in self._participants}
        meeting_colors = get_meeting_colors(self._meetings)
        for meeting, start_minutes in self.best_solution.items():
            day = start_minutes // self._total_minutes
            start_minutes_in_day = start_minutes % self._total_minutes
            start_datetime = datetime.combine(datetime.today(), time(8, 0)) + timedelta(minutes=start_minutes_in_day)
            end_datetime = start_datetime + timedelta(minutes=self._meetings[meeting]["duration"])
            start_time = start_datetime.time()
            end_time = end_datetime.time()

            for participant in self._meetings[meeting]["participants"]:
                schedules[participant].append((meeting, start_time, end_time, day))

        for participant, schedule in schedules.items():
            sorted_schedule = sorted(schedule, key=lambda x: x[1])
            meetings_list = []
            for meeting, start, end, day in sorted_schedule:
                meetings_list.append({
                    'id': meeting,
                    'start': start.hour + start.minute / 60,
                    'end': end.hour + end.minute / 60,
                    'color': meeting_colors[meeting],
                    'day': day + 1
                })

            result_data.append({
                'name': participant,
                'meetings': meetings_list
            })

        return result_data




def time_str_to_minutes(t):
    h, m = map(int, t.split(':'))
    return h * 60 + m

def scheduleIntervalMeetings(meetingRequests, participants):
    # Define your time interval
    start_time = time(8, 0)  # 9 AM
    end_time = time(18, 0)  # 1 PM
    total_minutes = (end_time.hour - start_time.hour) * 60
    num_days = 1  # Number of days
    
    # Convert the meetings input format to the old format
    meetings = {m['name']: {'duration': m['duration'], 'participants': set(m['invitedParticipants']), 'day_interval': m['day_interval']} for m in meetingRequests}

    # # Define meetings with their respective time intervals (in minutes)
    # meetings_data = [
    #     {'name': 'M1', 'duration': 90, 'invitedParticipants': ['Alice', 'Bob'], 'day_interval': None},
    #     {'name': 'M2', 'duration': 118, 'invitedParticipants': ['Alice', 'Charlie'], 'day_interval': (2, 2)},
    #     {'name': 'M3', 'duration': 80, 'invitedParticipants': ['Bob', 'Charlie'], 'day_interval': None},
    #     {'name': 'M4', 'duration': 20, 'invitedParticipants': ['Bob', 'Dave'], 'day_interval': None},
    #     {'name': 'M5', 'duration': 50, 'invitedParticipants': ['Alice', 'Dave'], 'day_interval': None},
    #     {'name': 'M6', 'duration': 25, 'invitedParticipants': ['Imre', 'Alice'], 'day_interval': None},
    #     {'name': 'M7', 'duration': 20, 'invitedParticipants': ['Imre', 'Bob'], 'day_interval': None},
    # ]
    
    # # Convert the new meetings input format to the old format
    # meetings = {m['name']: {'duration': m['duration'], 'participants': set(m['invitedParticipants']), 'day_interval': m['day_interval']} for m in meetings_data}


    # # Define importance scores for participants
    # participant_importance_scores = {
    #     'Alice': 5,
    #     'Bob': 1,
    #     'Charlie': 5,
    #     'Tom': 1,
    #     'Jake': 5
    # }
    #Convert the participants input format to the old format
    participant_importance_scores = {p['name']: p['importance'] for p in participants}

    # Create a CP-SAT model
    model = cp_model.CpModel()
    
    # # Define unavailable time intervals for participants (day, start_minutes, end_minutes)
    # unavailable_intervals = {
    #     'Alice': [(1, 0, 60), (2, 0, 180)],  # Alice is unavailable on day 1 from 10:00 - 10:30
    #     'Bob': [(1, 0, 60)],  # Bob is unavailable on day 2 from 11:00 - 11:30
    #     'Charlie': [(1, 0, 60)],
    #     'Dave': [(1, 0, 60)],
    #     'Imre': [],  # Imre is unavailable on day 1 from 10:00 - 11:30
    # }
    
    # participant_preferred_times = {
    #     'Bob': 'afternoon',
    #     'Charlie': 'evening',
    #     'Dave': 'afternoon',
    # }
    
    participant_preferred_times = {p['name']: p['preferred_time_of_day'] for p in participants}
    
    # Define time ranges for time of day preferences
    preferred_time_ranges = {
        'morning': (time(8, 0), time(12, 0)),
        'afternoon': (time(12, 0), time(15, 0)),
        'evening': (time(15, 0), time(18, 0)),
    }
    
    # Calculate start and end times in minutes
    start_minutes = time_str_to_minutes(start_time.strftime("%H:%M"))
    end_minutes = time_str_to_minutes(end_time.strftime("%H:%M"))
    
    unavailable_intervals = {}
    for p in participants:
        name = p['name']
        unavailable_intervals[name] = []
        for slot in p['unavailableSlots']:
            day = slot['day']
            start_unavailable = max(time_str_to_minutes(slot['startTime']), start_minutes) - start_minutes
            end_unavailable = min(time_str_to_minutes(slot['endTime']), end_minutes) - start_minutes
            unavailable_intervals[name].append((day, start_unavailable, end_unavailable))

    # Create variables for the start time of each meeting
    meeting_start_vars = {}
    for meeting, info in meetings.items():
        meeting_start_vars[meeting] = model.NewIntVar(0, total_minutes * num_days - info['duration'], f'start_{meeting}')

    # Extract unique participants
    participants = set()
    for info in meetings.values():
        participants |= info['participants']
    
    participant_overlaps = {participant: model.NewIntVar(0, total_minutes * num_days, f'overlap_{participant}') for participant in participants}
    
    for meeting, info in meetings.items():
        meeting_start_var = meeting_start_vars[meeting]
        if info['day_interval']:
            start_day, end_day = info['day_interval']
            start_day_minutes = (start_day - 1) * total_minutes
            end_day_minutes = end_day * total_minutes - info['duration']
            model.Add(meeting_start_var >= start_day_minutes)
            model.Add(meeting_start_var <= end_day_minutes)
            
            
            
    unavailability_penalty_coefficient = 20

    # Change the total_unavailability_penalty variable to include the penalty_coefficient
    total_unavailability_penalty = model.NewIntVar(0, total_minutes * len(participants) * unavailability_penalty_coefficient * 1000, 'total_unavailability_penalty')
    weighted_start_times = []

    unavailability_penalties = []
    
    unavailability_slack = 1000

    for meeting, info in meetings.items():
        for participant in info['participants']:
            if participant in unavailable_intervals:
                for day, start_unavailable, end_unavailable in unavailable_intervals[participant]:
                    weighted_start_time = model.NewIntVar(0, total_minutes * participant_importance_scores[participant], f'weighted_start_time_{meeting}_{participant}')
                    unavailability_overlap = model.NewIntVar(0, info['duration'], f'{meeting}_unavailability_overlap_{participant}_{day}_{start_unavailable}_{end_unavailable}')
                    weighted_unavailability_overlap = model.NewIntVar(0, info['duration'] * participant_importance_scores[participant] + unavailability_slack, f'weighted_{meeting}_unavailability_overlap_{participant}_{day}_{start_unavailable}_{end_unavailable}')
                    start_day_minutes = (day - 1) * total_minutes
                    in_unavailable_interval = model.NewBoolVar(f'{meeting}_in_{participant}_unavailable_interval_{day}_{start_unavailable}_{end_unavailable}')
                    slack = model.NewIntVar(0, unavailability_slack, f'{meeting}_slack_{participant}_{day}_{start_unavailable}_{end_unavailable}')
                
                    model.Add(meeting_start_vars[meeting] + info['duration'] - start_day_minutes - start_unavailable <= unavailability_overlap+slack).OnlyEnforceIf(in_unavailable_interval)
                    model.Add(meeting_start_vars[meeting] - start_day_minutes - end_unavailable >= 0).OnlyEnforceIf(in_unavailable_interval.Not())

                    model.Add(weighted_unavailability_overlap == (unavailability_overlap + slack) * participant_importance_scores[participant])
                    unavailability_penalties.append((weighted_unavailability_overlap))


    # Update the objective function to minimize total unavailability penalty in addition to total overlap time
    model.Add(total_unavailability_penalty == sum(unavailability_penalties) * unavailability_penalty_coefficient)
    
    
    
    overlap_penalty_coefficient = 10

    total_overlap = model.NewIntVar(0, total_minutes * len(participants) * overlap_penalty_coefficient * 1000, 'total_overlap')
    overlaps = []
    participant_individual_overlaps = {participant: [] for participant in participants}

    for participant in participants:
        for m1, info1 in meetings.items():
            for m2, info2 in meetings.items():
                if m1 < m2 and participant in info1['participants'] and participant in info2['participants']:
                    overlap = model.NewIntVar(0, min(info1['duration'], info2['duration']), f'overlap_{m1}_{m2}')
                    weighted_overlap = model.NewIntVar(0, (min(info1['duration'], info2['duration'])) * participant_importance_scores[participant], f'weighted_overlap_{m1}_{m2}')
                    m1_before_m2 = model.NewBoolVar(f'{m1}_before_{m2}_{participant}')

                    slack = model.NewIntVar(0, min(info1['duration'], info2['duration']), f'{m1}_{m2}_overlap_slack_{participant}')

                    model.Add(meeting_start_vars[m1] < meeting_start_vars[m2]).OnlyEnforceIf(m1_before_m2)
                    model.Add(overlap + slack >= (meeting_start_vars[m1] + info1['duration'] - meeting_start_vars[m2])).OnlyEnforceIf(m1_before_m2)
                    model.Add(overlap + slack >= (meeting_start_vars[m2] + info2['duration'] - meeting_start_vars[m1])).OnlyEnforceIf(m1_before_m2.Not())
                    
                    model.Add(weighted_overlap == (overlap + slack) * participant_importance_scores[participant])
                    overlaps.append(weighted_overlap)

    model.Add(total_overlap == sum(overlaps) * overlap_penalty_coefficient)
    
    
    for participant in participants:
        model.Add(participant_overlaps[participant] == sum(participant_individual_overlaps[participant]))
        
     # Add constraints for meeting start and end times per day
    for meeting, start_var in meeting_start_vars.items():
        for day in range(1, num_days):
            not_in_day = model.NewBoolVar(f'{meeting}_not_in_day_{day}')
            model.Add(start_var >= day * total_minutes).OnlyEnforceIf(not_in_day)
            model.Add(start_var + meetings[meeting]['duration'] <= day * total_minutes).OnlyEnforceIf(not_in_day.Not())
            
            
    # Add variables for total preference penalty
    total_preference_penalty = model.NewIntVar(0, total_minutes * len(participants)*50, 'total_preference_penalty')

    # Add constraints to measure the preference penalty for each participant
    preference_penalties = []
    for meeting, info in meetings.items():
        for participant in info['participants']:
            if participant in participant_preferred_times:
                start_pref, end_pref = preferred_time_ranges[participant_preferred_times[participant]]
                start_pref_minutes = (start_pref.hour - start_time.hour) * 60 + start_pref.minute
                end_pref_minutes = (end_pref.hour - start_time.hour) * 60 + end_pref.minute
                preference_penalty = model.NewIntVar(0, info['duration'], f'{meeting}_preference_penalty_{participant}')
                weighted_preference_penalty = model.NewIntVar(0, 100000, f'weighted_{meeting}_preference_penalty_{participant}')
                in_preferred_time = model.NewBoolVar(f'{meeting}_in_{participant}_preferred_time')
                model.Add(meeting_start_vars[meeting] >= start_pref_minutes).OnlyEnforceIf(in_preferred_time)
                model.Add(meeting_start_vars[meeting] + info['duration'] <= end_pref_minutes).OnlyEnforceIf(in_preferred_time)
                #model.Add(preference_penalty == 0).OnlyEnforceIf(in_preferred_time)
                model.Add(preference_penalty == info['duration']).OnlyEnforceIf(in_preferred_time.Not())
                model.Add(weighted_preference_penalty == preference_penalty)
                preference_penalties.append(weighted_preference_penalty * participant_importance_scores[participant])
                
    # Update the objective function to minimize total preference penalty in addition to total overlap time and total unavailability penalty
    model.Add(total_preference_penalty == sum(preference_penalties))
            
    # Minimize total overlap time
    model.Minimize(total_overlap + total_unavailability_penalty + total_preference_penalty)
    
    # Solve the model
    solver = cp_model.CpSolver()
    solver.parameters.max_time_in_seconds = 5
    solver.parameters.num_search_workers = 4
        
        
        
    solution_printer = MeetingPrinter(meeting_start_vars, meetings, participants, total_overlap, participant_overlaps, total_minutes)
    status = solver.SolveWithSolutionCallback(model, solution_printer)

    result_data = solution_printer.get_result_data()

    # Print the best solution
    solution_printer.print_best_solution()

    #print(f'unavailability clashes : {solver.Value(total_unavailability_penalty)} ')
    print(solver.ObjectiveValue())
    print(f'Unavailability Penalty: {solver.Value(total_unavailability_penalty)}')
    print(f'Overlap Penalty: {solver.Value(total_overlap)}')
    print(f'Preference Penalty: {solver.Value(total_preference_penalty)}')
    print(f'resultData: {result_data}')
    return result_data