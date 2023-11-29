/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMembership = /* GraphQL */ `
  subscription OnCreateMembership(
    $filter: ModelSubscriptionMembershipFilterInput
  ) {
    onCreateMembership(filter: $filter) {
      id
      department
      position
      importance
      userID
      teamID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateMembership = /* GraphQL */ `
  subscription OnUpdateMembership(
    $filter: ModelSubscriptionMembershipFilterInput
  ) {
    onUpdateMembership(filter: $filter) {
      id
      department
      position
      importance
      userID
      teamID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteMembership = /* GraphQL */ `
  subscription OnDeleteMembership(
    $filter: ModelSubscriptionMembershipFilterInput
  ) {
    onDeleteMembership(filter: $filter) {
      id
      department
      position
      importance
      userID
      teamID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateMeeting = /* GraphQL */ `
  subscription OnCreateMeeting($filter: ModelSubscriptionMeetingFilterInput) {
    onCreateMeeting(filter: $filter) {
      id
      title
      date
      categories
      start_time
      description
      location
      end_time
      teamID
      users {
        items {
          id
          meetingId
          userId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateMeeting = /* GraphQL */ `
  subscription OnUpdateMeeting($filter: ModelSubscriptionMeetingFilterInput) {
    onUpdateMeeting(filter: $filter) {
      id
      title
      date
      categories
      start_time
      description
      location
      end_time
      teamID
      users {
        items {
          id
          meetingId
          userId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteMeeting = /* GraphQL */ `
  subscription OnDeleteMeeting($filter: ModelSubscriptionMeetingFilterInput) {
    onDeleteMeeting(filter: $filter) {
      id
      title
      date
      categories
      start_time
      description
      location
      end_time
      teamID
      users {
        items {
          id
          meetingId
          userId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
      id
      username
      email
      first_name
      last_name
      avatar
      meetings {
        items {
          id
          meetingId
          userId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Memberships {
        items {
          id
          department
          position
          importance
          userID
          teamID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      ScheduledMeetings {
        items {
          id
          userId
          scheduledMeetingId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      preferred_time_of_day
      importance
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
      id
      username
      email
      first_name
      last_name
      avatar
      meetings {
        items {
          id
          meetingId
          userId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Memberships {
        items {
          id
          department
          position
          importance
          userID
          teamID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      ScheduledMeetings {
        items {
          id
          userId
          scheduledMeetingId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      preferred_time_of_day
      importance
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
      id
      username
      email
      first_name
      last_name
      avatar
      meetings {
        items {
          id
          meetingId
          userId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Memberships {
        items {
          id
          department
          position
          importance
          userID
          teamID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      ScheduledMeetings {
        items {
          id
          userId
          scheduledMeetingId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      preferred_time_of_day
      importance
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateParticipantUnavailability = /* GraphQL */ `
  subscription OnCreateParticipantUnavailability(
    $filter: ModelSubscriptionParticipantUnavailabilityFilterInput
  ) {
    onCreateParticipantUnavailability(filter: $filter) {
      id
      date
      start_time
      end_time
      userID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateParticipantUnavailability = /* GraphQL */ `
  subscription OnUpdateParticipantUnavailability(
    $filter: ModelSubscriptionParticipantUnavailabilityFilterInput
  ) {
    onUpdateParticipantUnavailability(filter: $filter) {
      id
      date
      start_time
      end_time
      userID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteParticipantUnavailability = /* GraphQL */ `
  subscription OnDeleteParticipantUnavailability(
    $filter: ModelSubscriptionParticipantUnavailabilityFilterInput
  ) {
    onDeleteParticipantUnavailability(filter: $filter) {
      id
      date
      start_time
      end_time
      userID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateTeam = /* GraphQL */ `
  subscription OnCreateTeam($filter: ModelSubscriptionTeamFilterInput) {
    onCreateTeam(filter: $filter) {
      id
      name
      description
      avatar
      headquarter
      ScheduledMeetings {
        items {
          id
          title
          earliest_date
          latest_date
          categories
          earliest_start_time
          teamID
          latest_end_time
          invites_by
          availableDays
          description
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Meetings {
        items {
          id
          title
          date
          categories
          start_time
          description
          location
          end_time
          teamID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Memberships {
        items {
          id
          department
          position
          importance
          userID
          teamID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateTeam = /* GraphQL */ `
  subscription OnUpdateTeam($filter: ModelSubscriptionTeamFilterInput) {
    onUpdateTeam(filter: $filter) {
      id
      name
      description
      avatar
      headquarter
      ScheduledMeetings {
        items {
          id
          title
          earliest_date
          latest_date
          categories
          earliest_start_time
          teamID
          latest_end_time
          invites_by
          availableDays
          description
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Meetings {
        items {
          id
          title
          date
          categories
          start_time
          description
          location
          end_time
          teamID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Memberships {
        items {
          id
          department
          position
          importance
          userID
          teamID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteTeam = /* GraphQL */ `
  subscription OnDeleteTeam($filter: ModelSubscriptionTeamFilterInput) {
    onDeleteTeam(filter: $filter) {
      id
      name
      description
      avatar
      headquarter
      ScheduledMeetings {
        items {
          id
          title
          earliest_date
          latest_date
          categories
          earliest_start_time
          teamID
          latest_end_time
          invites_by
          availableDays
          description
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Meetings {
        items {
          id
          title
          date
          categories
          start_time
          description
          location
          end_time
          teamID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Memberships {
        items {
          id
          department
          position
          importance
          userID
          teamID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateScheduledMeeting = /* GraphQL */ `
  subscription OnCreateScheduledMeeting(
    $filter: ModelSubscriptionScheduledMeetingFilterInput
  ) {
    onCreateScheduledMeeting(filter: $filter) {
      id
      title
      earliest_date
      latest_date
      categories
      earliest_start_time
      teamID
      users {
        items {
          id
          userId
          scheduledMeetingId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      latest_end_time
      invites_by
      availableDays
      description
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateScheduledMeeting = /* GraphQL */ `
  subscription OnUpdateScheduledMeeting(
    $filter: ModelSubscriptionScheduledMeetingFilterInput
  ) {
    onUpdateScheduledMeeting(filter: $filter) {
      id
      title
      earliest_date
      latest_date
      categories
      earliest_start_time
      teamID
      users {
        items {
          id
          userId
          scheduledMeetingId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      latest_end_time
      invites_by
      availableDays
      description
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteScheduledMeeting = /* GraphQL */ `
  subscription OnDeleteScheduledMeeting(
    $filter: ModelSubscriptionScheduledMeetingFilterInput
  ) {
    onDeleteScheduledMeeting(filter: $filter) {
      id
      title
      earliest_date
      latest_date
      categories
      earliest_start_time
      teamID
      users {
        items {
          id
          userId
          scheduledMeetingId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      latest_end_time
      invites_by
      availableDays
      description
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateUserMeeting = /* GraphQL */ `
  subscription OnCreateUserMeeting(
    $filter: ModelSubscriptionUserMeetingFilterInput
  ) {
    onCreateUserMeeting(filter: $filter) {
      id
      meetingId
      userId
      meeting {
        id
        title
        date
        categories
        start_time
        description
        location
        end_time
        teamID
        users {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      user {
        id
        username
        email
        first_name
        last_name
        avatar
        meetings {
          nextToken
          startedAt
        }
        Memberships {
          nextToken
          startedAt
        }
        ScheduledMeetings {
          nextToken
          startedAt
        }
        preferred_time_of_day
        importance
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateUserMeeting = /* GraphQL */ `
  subscription OnUpdateUserMeeting(
    $filter: ModelSubscriptionUserMeetingFilterInput
  ) {
    onUpdateUserMeeting(filter: $filter) {
      id
      meetingId
      userId
      meeting {
        id
        title
        date
        categories
        start_time
        description
        location
        end_time
        teamID
        users {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      user {
        id
        username
        email
        first_name
        last_name
        avatar
        meetings {
          nextToken
          startedAt
        }
        Memberships {
          nextToken
          startedAt
        }
        ScheduledMeetings {
          nextToken
          startedAt
        }
        preferred_time_of_day
        importance
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteUserMeeting = /* GraphQL */ `
  subscription OnDeleteUserMeeting(
    $filter: ModelSubscriptionUserMeetingFilterInput
  ) {
    onDeleteUserMeeting(filter: $filter) {
      id
      meetingId
      userId
      meeting {
        id
        title
        date
        categories
        start_time
        description
        location
        end_time
        teamID
        users {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      user {
        id
        username
        email
        first_name
        last_name
        avatar
        meetings {
          nextToken
          startedAt
        }
        Memberships {
          nextToken
          startedAt
        }
        ScheduledMeetings {
          nextToken
          startedAt
        }
        preferred_time_of_day
        importance
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateUserScheduledMeeting = /* GraphQL */ `
  subscription OnCreateUserScheduledMeeting(
    $filter: ModelSubscriptionUserScheduledMeetingFilterInput
  ) {
    onCreateUserScheduledMeeting(filter: $filter) {
      id
      userId
      scheduledMeetingId
      user {
        id
        username
        email
        first_name
        last_name
        avatar
        meetings {
          nextToken
          startedAt
        }
        Memberships {
          nextToken
          startedAt
        }
        ScheduledMeetings {
          nextToken
          startedAt
        }
        preferred_time_of_day
        importance
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      scheduledMeeting {
        id
        title
        earliest_date
        latest_date
        categories
        earliest_start_time
        teamID
        users {
          nextToken
          startedAt
        }
        latest_end_time
        invites_by
        availableDays
        description
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateUserScheduledMeeting = /* GraphQL */ `
  subscription OnUpdateUserScheduledMeeting(
    $filter: ModelSubscriptionUserScheduledMeetingFilterInput
  ) {
    onUpdateUserScheduledMeeting(filter: $filter) {
      id
      userId
      scheduledMeetingId
      user {
        id
        username
        email
        first_name
        last_name
        avatar
        meetings {
          nextToken
          startedAt
        }
        Memberships {
          nextToken
          startedAt
        }
        ScheduledMeetings {
          nextToken
          startedAt
        }
        preferred_time_of_day
        importance
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      scheduledMeeting {
        id
        title
        earliest_date
        latest_date
        categories
        earliest_start_time
        teamID
        users {
          nextToken
          startedAt
        }
        latest_end_time
        invites_by
        availableDays
        description
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteUserScheduledMeeting = /* GraphQL */ `
  subscription OnDeleteUserScheduledMeeting(
    $filter: ModelSubscriptionUserScheduledMeetingFilterInput
  ) {
    onDeleteUserScheduledMeeting(filter: $filter) {
      id
      userId
      scheduledMeetingId
      user {
        id
        username
        email
        first_name
        last_name
        avatar
        meetings {
          nextToken
          startedAt
        }
        Memberships {
          nextToken
          startedAt
        }
        ScheduledMeetings {
          nextToken
          startedAt
        }
        preferred_time_of_day
        importance
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      scheduledMeeting {
        id
        title
        earliest_date
        latest_date
        categories
        earliest_start_time
        teamID
        users {
          nextToken
          startedAt
        }
        latest_end_time
        invites_by
        availableDays
        description
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
