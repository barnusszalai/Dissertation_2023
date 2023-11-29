import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen';
import TeamsScreen from '../screens/TeamsScreen'
import ProfileScreen from '../screens/ProfileScreen'
import InboxScreen from '../screens/inboxScreen';
import SearchScreen from '../screens/searchScreen';
import { Ionicons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
import { HeaderTitle } from 'react-navigation-stack';

const Tab = createBottomTabNavigator(); 

const MainTabNavigator = () => {
    return (
        <Tab.Navigator 
            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#E53F71',
                headerShown: false,
                tabBarStyle: {
                    paddingTop: 10,
                    backgroundColor: 'white',
                    height: 35,
                }
            }}
        >
            <Tab.Screen 
                name="Home" 
                component={HomeScreen}
                options={{ 
                    tabBarIcon: ({ color, size, focused}) => (
                        <Ionicons name={focused ? "home" : "home-outline"} size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Teams" 
                component={TeamsScreen} 
                options={{ 
                    tabBarIcon: ({ color, size}) => (
                        <AntDesign name="team" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Inbox" 
                component={InboxScreen} 
                options={{ 
                    tabBarIcon: ({ color, size}) => (
                        <AntDesign name="inbox" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Search" 
                component={SearchScreen} 
                options={{
                    tabBarIcon: ({ color, size}) => (
                        <AntDesign name="search1" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Profile" 
                component={ProfileScreen} 
                options={{ 
                    tabBarIcon: ({ color, size, focused}) => (
                        <MaterialCommunityIcons name={focused? "account-circle" : "account-circle-outline"} size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default MainTabNavigator;