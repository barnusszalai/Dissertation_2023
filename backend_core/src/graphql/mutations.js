/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMembership = /* GraphQL */ `
  mutation CreateMembership(
    $input: CreateMembershipInput!
    $condition: ModelMembershipConditionInput
  ) {
    createMembership(input: $input, condition: $condition) {
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
export const updateMembership = /* GraphQL */ `
  mutation UpdateMembership(
    $input: UpdateMembershipInput!
    $condition: ModelMembershipConditionInput
  ) {
    updateMembership(input: $input, condition: $condition) {
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
export const deleteMembership = /* GraphQL */ `
  mutation DeleteMembership(
    $input: DeleteMembershipInput!
    $condition: ModelMembershipConditionInput
  ) {
    deleteMembership(input: $input, condition: $condition) {
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
export const createMeeting = /* GraphQL */ `
  mutation CreateMeeting(
    $input: CreateMeetingInput!
    $condition: ModelMeetingConditionInput
  ) {
    createMeeting(input: $input, condition: $condition) {
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
export const updateMeeting = /* GraphQL */ `
  mutation UpdateMeeting(
    $input: UpdateMeetingInput!
    $condition: ModelMeetingConditionInput
  ) {
    updateMeeting(input: $input, condition: $condition) {
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
export const deleteMeeting = /* GraphQL */ `
  mutation DeleteMeeting(
    $input: DeleteMeetingInput!
    $condition: ModelMeetingConditionInput
  ) {
    deleteMeeting(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createParticipantUnavailability = /* GraphQL */ `
  mutation CreateParticipantUnavailability(
    $input: CreateParticipantUnavailabilityInput!
    $condition: ModelParticipantUnavailabilityConditionInput
  ) {
    createParticipantUnavailability(input: $input, condition: $condition) {
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
export const updateParticipantUnavailability = /* GraphQL */ `
  mutation UpdateParticipantUnavailability(
    $input: UpdateParticipantUnavailabilityInput!
    $condition: ModelParticipantUnavailabilityConditionInput
  ) {
    updateParticipantUnavailability(input: $input, condition: $condition) {
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
export const deleteParticipantUnavailability = /* GraphQL */ `
  mutation DeleteParticipantUnavailability(
    $input: DeleteParticipantUnavailabilityInput!
    $condition: ModelParticipantUnavailabilityConditionInput
  ) {
    deleteParticipantUnavailability(input: $input, condition: $condition) {
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
export const createTeam = /* GraphQL */ `
  mutation CreateTeam(
    $input: CreateTeamInput!
    $condition: ModelTeamConditionInput
  ) {
    createTeam(input: $input, condition: $condition) {
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
export const updateTeam = /* GraphQL */ `
  mutation UpdateTeam(
    $input: UpdateTeamInput!
    $condition: ModelTeamConditionInput
  ) {
    updateTeam(input: $input, condition: $condition) {
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
export const deleteTeam = /* GraphQL */ `
  mutation DeleteTeam(
    $input: DeleteTeamInput!
    $condition: ModelTeamConditionInput
  ) {
    deleteTeam(input: $input, condition: $condition) {
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
export const createScheduledMeeting = /* GraphQL */ `
  mutation CreateScheduledMeeting(
    $input: CreateScheduledMeetingInput!
    $condition: ModelScheduledMeetingConditionInput
  ) {
    createScheduledMeeting(input: $input, condition: $condition) {
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
export const updateScheduledMeeting = /* GraphQL */ `
  mutation UpdateScheduledMeeting(
    $input: UpdateScheduledMeetingInput!
    $condition: ModelScheduledMeetingConditionInput
  ) {
    updateScheduledMeeting(input: $input, condition: $condition) {
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
export const deleteScheduledMeeting = /* GraphQL */ `
  mutation DeleteScheduledMeeting(
    $input: DeleteScheduledMeetingInput!
    $condition: ModelScheduledMeetingConditionInput
  ) {
    deleteScheduledMeeting(input: $input, condition: $condition) {
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
export const createUserMeeting = /* GraphQL */ `
  mutation CreateUserMeeting(
    $input: CreateUserMeetingInput!
    $condition: ModelUserMeetingConditionInput
  ) {
    createUserMeeting(input: $input, condition: $condition) {
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
export const updateUserMeeting = /* GraphQL */ `
  mutation UpdateUserMeeting(
    $input: UpdateUserMeetingInput!
    $condition: ModelUserMeetingConditionInput
  ) {
    updateUserMeeting(input: $input, condition: $condition) {
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
export const deleteUserMeeting = /* GraphQL */ `
  mutation DeleteUserMeeting(
    $input: DeleteUserMeetingInput!
    $condition: ModelUserMeetingConditionInput
  ) {
    deleteUserMeeting(input: $input, condition: $condition) {
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
export const createUserScheduledMeeting = /* GraphQL */ `
  mutation CreateUserScheduledMeeting(
    $input: CreateUserScheduledMeetingInput!
    $condition: ModelUserScheduledMeetingConditionInput
  ) {
    createUserScheduledMeeting(input: $input, condition: $condition) {
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
export const updateUserScheduledMeeting = /* GraphQL */ `
  mutation UpdateUserScheduledMeeting(
    $input: UpdateUserScheduledMeetingInput!
    $condition: ModelUserScheduledMeetingConditionInput
  ) {
    updateUserScheduledMeeting(input: $input, condition: $condition) {
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
export const deleteUserScheduledMeeting = /* GraphQL */ `
  mutation DeleteUserScheduledMeeting(
    $input: DeleteUserScheduledMeetingInput!
    $condition: ModelUserScheduledMeetingConditionInput
  ) {
    deleteUserScheduledMeeting(input: $input, condition: $condition) {
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
