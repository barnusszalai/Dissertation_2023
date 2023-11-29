import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { updateUser } from '../../graphql/mutations';
import { getUser } from '../../graphql/queries';
import { DataContext } from '../../DataContext/DataContext';

const PersonalSettings = () => {
    const times = ['morning', 'afternoon', 'evening'];
    const [versionIncrease, setVersionIncrease] = useState(0)
    const [selectedTime, setSelectedTime] = useState('');
    const [currentUser, setCurrentUser] = useState('')

  useEffect(() => {
    const syncUser = async () => {

      // query the database using Auth user id
      const userData = await API.graphql(
        graphqlOperation(getUser, { id: '0b713912-1986-46eb-96e8-7413d629d620' })
      );

      // check if user exists
      if (userData.data.getUser) {
        setCurrentUser(userData.data.getUser)
        return;
      }


    };

    syncUser();

  }, []);

  const handlePress = (time) => {
    //
    //console.warn(selectedTime)
  };

  const handleSave = () => {
    console.warn(selectedTime)
    if (selectedTime) {
        const input = {
            id: currentUser.id,
            preferred_time_of_day: selectedTime,
            _version: (currentUser._version+versionIncrease),
        };
        console.warn(input)
        API.graphql(graphqlOperation(updateUser, { input: input })).then((result) => {
            console.warn(result)
            setVersionIncrease(versionIncrease + 1)
        }).catch(function(error) {
           console.warn("errorrr")
        });
        Alert.alert('Settings Saved', `Your preferred meeting time is set to ${selectedTime}.`);
    } else {
      Alert.alert('Please select a time', 'You must select a preferred time of day for meetings.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        When do you like to have your meetings?
      </Text>
      <View style={styles.buttonsContainer}>
        {times.map((time) => (
          <TouchableOpacity
            key={time}
            style={[
              styles.button,
              selectedTime === time ? styles.selectedButton : null,
            ]}
            onPress={() => setSelectedTime(time)}
          >
            <Text
              style={[
                styles.buttonText,
                selectedTime === time ? styles.selectedButtonText : null,
              ]}
            >
              {time.charAt(0).toUpperCase() + time.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 5,
    elevation: 3,
  },
  selectedButton: {
    backgroundColor: '#ffb4a2',
    borderColor: '#ffb4a2',
  },
  buttonText: {
    fontSize: 18,
    color: '#333',
  },
  selectedButtonText: {
    color: '#000',
  },
  saveButton: {
    backgroundColor: '#800020',
    borderRadius: 25,
    paddingHorizontal: 30,
    paddingVertical: 12,
    elevation: 3,
    marginTop: 30,
    marginBottom: 100,
  },
  saveButtonText: {
    fontSize: 18,
    color: 'white',
  },
});

export default PersonalSettings;
