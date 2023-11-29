import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";





type EagerMembership = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Membership, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly department?: string | null;
  readonly position?: string | null;
  readonly importance?: number | null;
  readonly userID: string;
  readonly teamID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMembership = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Membership, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly department?: string | null;
  readonly position?: string | null;
  readonly importance?: number | null;
  readonly userID: string;
  readonly teamID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Membership = LazyLoading extends LazyLoadingDisabled ? EagerMembership : LazyMembership

export declare const Membership: (new (init: ModelInit<Membership>) => Membership) & {
  copyOf(source: Membership, mutator: (draft: MutableModel<Membership>) => MutableModel<Membership> | void): Membership;
}

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
  readonly location?: string | null;
  readonly end_time: string;
  readonly teamID: string;
  readonly users?: (UserMeeting | null)[] | null;
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
  readonly location?: string | null;
  readonly end_time: string;
  readonly teamID: string;
  readonly users: AsyncCollection<UserMeeting>;
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
  readonly meetings?: (UserMeeting | null)[] | null;
  readonly Memberships?: (Membership | null)[] | null;
  readonly ScheduledMeetings?: (UserScheduledMeeting | null)[] | null;
  readonly preferred_time_of_day?: string | null;
  readonly importance?: number | null;
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
  readonly meetings: AsyncCollection<UserMeeting>;
  readonly Memberships: AsyncCollection<Membership>;
  readonly ScheduledMeetings: AsyncCollection<UserScheduledMeeting>;
  readonly preferred_time_of_day?: string | null;
  readonly importance?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerScheduledMeeting = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ScheduledMeeting, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title?: string | null;
  readonly earliest_date?: string | null;
  readonly latest_date?: string | null;
  readonly categories?: (string | null)[] | null;
  readonly earliest_start_time?: string | null;
  readonly teamID: string;
  readonly users?: (UserScheduledMeeting | null)[] | null;
  readonly latest_end_time?: string | null;
  readonly invites_by?: string | null;
  readonly availableDays?: (string | null)[] | null;
  readonly description?: string | null;
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
  readonly earliest_date?: string | null;
  readonly latest_date?: string | null;
  readonly categories?: (string | null)[] | null;
  readonly earliest_start_time?: string | null;
  readonly teamID: string;
  readonly users: AsyncCollection<UserScheduledMeeting>;
  readonly latest_end_time?: string | null;
  readonly invites_by?: string | null;
  readonly availableDays?: (string | null)[] | null;
  readonly description?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ScheduledMeeting = LazyLoading extends LazyLoadingDisabled ? EagerScheduledMeeting : LazyScheduledMeeting

export declare const ScheduledMeeting: (new (init: ModelInit<ScheduledMeeting>) => ScheduledMeeting) & {
  copyOf(source: ScheduledMeeting, mutator: (draft: MutableModel<ScheduledMeeting>) => MutableModel<ScheduledMeeting> | void): ScheduledMeeting;
}

type EagerParticipantUnavailability = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ParticipantUnavailability, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly date?: string | null;
  readonly start_time?: string | null;
  readonly end_time?: string | null;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyParticipantUnavailability = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ParticipantUnavailability, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly date?: string | null;
  readonly start_time?: string | null;
  readonly end_time?: string | null;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ParticipantUnavailability = LazyLoading extends LazyLoadingDisabled ? EagerParticipantUnavailability : LazyParticipantUnavailability

export declare const ParticipantUnavailability: (new (init: ModelInit<ParticipantUnavailability>) => ParticipantUnavailability) & {
  copyOf(source: ParticipantUnavailability, mutator: (draft: MutableModel<ParticipantUnavailability>) => MutableModel<ParticipantUnavailability> | void): ParticipantUnavailability;
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
  readonly ScheduledMeetings?: (ScheduledMeeting | null)[] | null;
  readonly Meetings?: (Meeting | null)[] | null;
  readonly Memberships?: (Membership | null)[] | null;
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
  readonly ScheduledMeetings: AsyncCollection<ScheduledMeeting>;
  readonly Meetings: AsyncCollection<Meeting>;
  readonly Memberships: AsyncCollection<Membership>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Team = LazyLoading extends LazyLoadingDisabled ? EagerTeam : LazyTeam

export declare const Team: (new (init: ModelInit<Team>) => Team) & {
  copyOf(source: Team, mutator: (draft: MutableModel<Team>) => MutableModel<Team> | void): Team;
}

type EagerUserMeeting = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserMeeting, 'id'>;
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

type LazyUserMeeting = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserMeeting, 'id'>;
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

export declare type UserMeeting = LazyLoading extends LazyLoadingDisabled ? EagerUserMeeting : LazyUserMeeting

export declare const UserMeeting: (new (init: ModelInit<UserMeeting>) => UserMeeting) & {
  copyOf(source: UserMeeting, mutator: (draft: MutableModel<UserMeeting>) => MutableModel<UserMeeting> | void): UserMeeting;
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