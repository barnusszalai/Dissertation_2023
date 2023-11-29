// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Membership, Meeting, User, ScheduledMeeting, ParticipantUnavailability, Team, UserMeeting, UserScheduledMeeting } = initSchema(schema);

export {
  Membership,
  Meeting,
  User,
  ScheduledMeeting,
  ParticipantUnavailability,
  Team,
  UserMeeting,
  UserScheduledMeeting
};