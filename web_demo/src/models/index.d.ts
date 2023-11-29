import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";





type EagerMeeting = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Meeting, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title: string;
  readonly date: string;
  readonly categories?: (string | null)[] | null;
  readonly start_time: string;
  readonly description?: string | null;
  readonly Users?: (MeetingUser | null)[] | null;
  readonly location?: string | null;
  readonly end_time: string;
  readonly teamID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMeeting = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Meeting, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title: string;
  readonly date: string;
  readonly categories?: (string | null)[] | null;
  readonly start_time: string;
  readonly description?: string | null;
  readonly Users: AsyncCollection<MeetingUser>;
  readonly location?: string | null;
  readonly end_time: string;
  readonly teamID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Meeting = LazyLoading extends LazyLoadingDisabled ? EagerMeeting : LazyMeeting

export declare const Meeting: (new (init: ModelInit<Meeting>) => Meeting) & {
  copyOf(source: Meeting, mutator: (draft: MutableModel<Meeting>) => MutableModel<Meeting> | void): Meeting;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly username: string;
  readonly email: string;
  readonly first_name: string;
  readonly last_name: string;
  readonly avatar?: string | null;
  readonly Teams?: (TeamUser | null)[] | null;
  readonly ScheduledMeetings?: (UserScheduledMeeting | null)[] | null;
  readonly meetings?: (MeetingUser | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly username: string;
  readonly email: string;
  readonly first_name: string;
  readonly last_name: string;
  readonly avatar?: string | null;
  readonly Teams: AsyncCollection<TeamUser>;
  readonly ScheduledMeetings: AsyncCollection<UserScheduledMeeting>;
  readonly meetings: AsyncCollection<MeetingUser>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerTeam = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Team, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly avatar?: string | null;
  readonly headquarter?: string | null;
  readonly Users?: (TeamUser | null)[] | null;
  readonly ScheduledMeetings?: (ScheduledMeeting | null)[] | null;
  readonly Meetings?: (Meeting | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTeam = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Team, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly avatar?: string | null;
  readonly headquarter?: string | null;
  readonly Users: AsyncCollection<TeamUser>;
  readonly ScheduledMeetings: AsyncCollection<ScheduledMeeting>;
  readonly Meetings: AsyncCollection<Meeting>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Team = LazyLoading extends LazyLoadingDisabled ? EagerTeam : LazyTeam

export declare const Team: (new (init: ModelInit<Team>) => Team) & {
  copyOf(source: Team, mutator: (draft: MutableModel<Team>) => MutableModel<Team> | void): Team;
}

type EagerScheduledMeeting = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ScheduledMeeting, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title?: string | null;
  readonly latest_date?: string | null;
  readonly earliest_start_time?: string | null;
  readonly categories?: (string | null)[] | null;
  readonly latest_start_time?: string | null;
  readonly teamID: string;
  readonly Invited_Users?: (UserScheduledMeeting | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyScheduledMeeting = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ScheduledMeeting, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title?: string | null;
  readonly latest_date?: string | null;
  readonly earliest_start_time?: string | null;
  readonly categories?: (string | null)[] | null;
  readonly latest_start_time?: string | null;
  readonly teamID: string;
  readonly Invited_Users: AsyncCollection<UserScheduledMeeting>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ScheduledMeeting = LazyLoading extends LazyLoadingDisabled ? EagerScheduledMeeting : LazyScheduledMeeting

export declare const ScheduledMeeting: (new (init: ModelInit<ScheduledMeeting>) => ScheduledMeeting) & {
  copyOf(source: ScheduledMeeting, mutator: (draft: MutableModel<ScheduledMeeting>) => MutableModel<ScheduledMeeting> | void): ScheduledMeeting;
}

type EagerMeetingUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<MeetingUser, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly meetingId?: string | null;
  readonly userId?: string | null;
  readonly meeting: Meeting;
  readonly user: User;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMeetingUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<MeetingUser, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly meetingId?: string | null;
  readonly userId?: string | null;
  readonly meeting: AsyncItem<Meeting>;
  readonly user: AsyncItem<User>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type MeetingUser = LazyLoading extends LazyLoadingDisabled ? EagerMeetingUser : LazyMeetingUser

export declare const MeetingUser: (new (init: ModelInit<MeetingUser>) => MeetingUser) & {
  copyOf(source: MeetingUser, mutator: (draft: MutableModel<MeetingUser>) => MutableModel<MeetingUser> | void): MeetingUser;
}

type EagerTeamUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TeamUser, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId?: string | null;
  readonly teamId?: string | null;
  readonly user: User;
  readonly team: Team;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTeamUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TeamUser, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId?: string | null;
  readonly teamId?: string | null;
  readonly user: AsyncItem<User>;
  readonly team: AsyncItem<Team>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type TeamUser = LazyLoading extends LazyLoadingDisabled ? EagerTeamUser : LazyTeamUser

export declare const TeamUser: (new (init: ModelInit<TeamUser>) => TeamUser) & {
  copyOf(source: TeamUser, mutator: (draft: MutableModel<TeamUser>) => MutableModel<TeamUser> | void): TeamUser;
}

type EagerUserScheduledMeeting = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserScheduledMeeting, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId?: string | null;
  readonly scheduledMeetingId?: string | null;
  readonly user: User;
  readonly scheduledMeeting: ScheduledMeeting;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserScheduledMeeting = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserScheduledMeeting, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId?: string | null;
  readonly scheduledMeetingId?: string | null;
  readonly user: AsyncItem<User>;
  readonly scheduledMeeting: AsyncItem<ScheduledMeeting>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserScheduledMeeting = LazyLoading extends LazyLoadingDisabled ? EagerUserScheduledMeeting : LazyUserScheduledMeeting

export declare const UserScheduledMeeting: (new (init: ModelInit<UserScheduledMeeting>) => UserScheduledMeeting) & {
  copyOf(source: UserScheduledMeeting, mutator: (draft: MutableModel<UserScheduledMeeting>) => MutableModel<UserScheduledMeeting> | void): UserScheduledMeeting;
}