/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMembership = /* GraphQL */ `
  query GetMembership($id: ID!) {
    getMembership(id: $id) {
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
export const listMemberships = /* GraphQL */ `
  query ListMemberships(
    $filter: ModelMembershipFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMemberships(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const syncMemberships = /* GraphQL */ `
  query SyncMemberships(
    $filter: ModelMembershipFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncMemberships(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
  }
`;
export const membershipsByUserID = /* GraphQL */ `
  query MembershipsByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelMembershipFilterInput
    $limit: Int
    $nextToken: String
  ) {
    membershipsByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const membershipsByTeamID = /* GraphQL */ `
  query MembershipsByTeamID(
    $teamID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelMembershipFilterInput
    $limit: Int
    $nextToken: String
  ) {
    membershipsByTeamID(
      teamID: $teamID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const getMeeting = /* GraphQL */ `
  query GetMeeting($id: ID!) {
    getMeeting(id: $id) {
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
export const listMeetings = /* GraphQL */ `
  query ListMeetings(
    $filter: ModelMeetingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMeetings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        date
        start_time
        end_time
        teamID
      }
      nextToken
      startedAt
    }
  }
`;
export const syncMeetings = /* GraphQL */ `
  query SyncMeetings(
    $filter: ModelMeetingFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncMeetings(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
      nextToken
      startedAt
    }
  }
`;
export const meetingsByTeamID = /* GraphQL */ `
  query MeetingsByTeamID(
    $teamID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelMeetingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    meetingsByTeamID(
      teamID: $teamID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
      startedAt
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getParticipantUnavailability = /* GraphQL */ `
  query GetParticipantUnavailability($id: ID!) {
    getParticipantUnavailability(id: $id) {
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
export const listParticipantUnavailabilities = /* GraphQL */ `
  query ListParticipantUnavailabilities(
    $filter: ModelParticipantUnavailabilityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listParticipantUnavailabilities(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncParticipantUnavailabilities = /* GraphQL */ `
  query SyncParticipantUnavailabilities(
    $filter: ModelParticipantUnavailabilityFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncParticipantUnavailabilities(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const participantUnavailabilitiesByUserID = /* GraphQL */ `
  query ParticipantUnavailabilitiesByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelParticipantUnavailabilityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    participantUnavailabilitiesByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getTeam = /* GraphQL */ `
  query GetTeam($id: ID!) {
    getTeam(id: $id) {
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
export const listTeams = /* GraphQL */ `
  query ListTeams(
    $filter: ModelTeamFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTeams(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        avatar
        headquarter
        ScheduledMeetings {
          nextToken
          startedAt
        }
        Meetings {
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
      nextToken
      startedAt
    }
  }
`;
export const syncTeams = /* GraphQL */ `
  query SyncTeams(
    $filter: ModelTeamFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncTeams(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        description
        avatar
        headquarter
        ScheduledMeetings {
          nextToken
          startedAt
        }
        Meetings {
          nextToken
          startedAt
        }
        Memberships {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getScheduledMeeting = /* GraphQL */ `
  query GetScheduledMeeting($id: ID!) {
    getScheduledMeeting(id: $id) {
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
export const listScheduledMeetings = /* GraphQL */ `
  query ListScheduledMeetings(
    $filter: ModelScheduledMeetingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listScheduledMeetings(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncScheduledMeetings = /* GraphQL */ `
  query SyncScheduledMeetings(
    $filter: ModelScheduledMeetingFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncScheduledMeetings(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const scheduledMeetingsByTeamID = /* GraphQL */ `
  query ScheduledMeetingsByTeamID(
    $teamID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelScheduledMeetingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    scheduledMeetingsByTeamID(
      teamID: $teamID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getUserMeeting = /* GraphQL */ `
  query GetUserMeeting($id: ID!) {
    getUserMeeting(id: $id) {
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
export const listUserMeetings = /* GraphQL */ `
  query ListUserMeetings(
    $filter: ModelUserMeetingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserMeetings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncUserMeetings = /* GraphQL */ `
  query SyncUserMeetings(
    $filter: ModelUserMeetingFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUserMeetings(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const userMeetingsByMeetingId = /* GraphQL */ `
  query UserMeetingsByMeetingId(
    $meetingId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelUserMeetingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userMeetingsByMeetingId(
      meetingId: $meetingId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const userMeetingsByUserId = /* GraphQL */ `
  query UserMeetingsByUserId(
    $userId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelUserMeetingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userMeetingsByUserId(
      userId: $userId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getUserScheduledMeeting = /* GraphQL */ `
  query GetUserScheduledMeeting($id: ID!) {
    getUserScheduledMeeting(id: $id) {
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
export const listUserScheduledMeetings = /* GraphQL */ `
  query ListUserScheduledMeetings(
    $filter: ModelUserScheduledMeetingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserScheduledMeetings(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncUserScheduledMeetings = /* GraphQL */ `
  query SyncUserScheduledMeetings(
    $filter: ModelUserScheduledMeetingFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUserScheduledMeetings(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const userScheduledMeetingsByUserId = /* GraphQL */ `
  query UserScheduledMeetingsByUserId(
    $userId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelUserScheduledMeetingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userScheduledMeetingsByUserId(
      userId: $userId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const userScheduledMeetingsByScheduledMeetingId = /* GraphQL */ `
  query UserScheduledMeetingsByScheduledMeetingId(
    $scheduledMeetingId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelUserScheduledMeetingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userScheduledMeetingsByScheduledMeetingId(
      scheduledMeetingId: $scheduledMeetingId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
