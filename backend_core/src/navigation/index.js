import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'


import HomeScreen from '../screens/HomeScreen'
import MeetingScreen from '../screens/MeetingScreen';
import CreateNewTeam from '../screens/TeamsScreen/createTeam'
import TeamScreen from '../screens/teamScreen';
import PeopleScreen from '../screens/CreateMeeting/selectParticipants';
import TeamMemberScreen from '../screens/MemberScreen';
import NewMeetingBasicInfoScreen from '../screens/CreateMeeting/basicInfo'
import TeamsScreen from '../screens/TeamsScreen';
import InviteComponent from '../screens/ManageTeam/inviteTeamMember';
import EditTeamScreen from '../screens/ManageTeam/editTeam';
import { TouchableOpacity } from 'react-native';
import MainTabNavigator from './MainTabNavigator';
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();


const Navigator = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name='Home' component={MainTabNavigator} options={{ headerShown: false}}/>
            <Stack.Screen name='Meeting' component={MeetingScreen}/>
            <Stack.Screen name='TeamsScreen' component={TeamsScreen}/>
            <Stack.Screen name='Team' 
              component={TeamScreen}
              options={{
                headerRight: () => (
                  <TouchableOpacity>
                    <Ionicons name="settings-outline" size={24} color={'green'} />
                  </TouchableOpacity>
                ),
              }}
            />
            <Stack.Screen name='CreateNewTeam' component={CreateNewTeam}/>
            <Stack.Screen name='NewMeetingRequestScreen' component={NewMeetingBasicInfoScreen}/>
            <Stack.Screen name='InviteMembersScreen' component={InviteComponent}/>
            <Stack.Screen name='PeopleScreen' component={PeopleScreen}/>
            <Stack.Screen name='TeamMemberScreen' component={TeamMemberScreen}/>
            <Stack.Screen name='EditTeamScreen' component={EditTeamScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
  ) 
}

export default Navigator