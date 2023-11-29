import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import { DataProvider } from './src/DataContext/DataContext';

import MeetingScreen from './src/screens/MeetingScreen';
import Navigator from './src/navigation';
import { Fragment, useEffect, useContext } from 'react';
import { Amplify, Auth, API, graphqlOperation } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native';
import awsconfig from './src/aws-exports';
import { getUser } from './src/graphql/queries';
import { createUser } from './src/graphql/mutations';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DataContext } from './src/DataContext/DataContext';

Amplify.configure(awsconfig)

function App() {

  useEffect(() => {
    const syncUser = async () => {
      // get Auth user
      const authUser = await Auth.currentAuthenticatedUser({
        bypassCache: true
      });

      // query the database using Auth user id
      const userData = await API.graphql(
        graphqlOperation(getUser, { id: authUser.attributes.sub })
      );

      // check if user exists
      if (userData.data.getUser) {
        console.warn("User is in database");
        return;
      }

      const newUser = {
        id: authUser.attributes.sub,
        email: authUser.attributes.email,
        username: authUser.attributes.phone_number,
        first_name: '',
        last_name: '',
      };

      // if there is no user in db, create one
      await API.graphql(
        graphqlOperation(createUser, { input: newUser })
      );


    };

    syncUser();

  }, []);

  return (
    <DataProvider>
      <View style={styles.container}>
        <Navigator />
      </View>
    </DataProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    flex: 1,
  },

  title: {
    color: 'red',
  }
});

export default withAuthenticator(App);
