// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Meeting, User, Team, ScheduledMeeting, MeetingUser, TeamUser, UserScheduledMeeting } = initSchema(schema);

export {
  Meeting,
  User,
  Team,
  ScheduledMeeting,
  MeetingUser,
  TeamUser,
  UserScheduledMeeting
};