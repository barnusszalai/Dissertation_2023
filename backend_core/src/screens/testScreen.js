import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { graphqlOperation } from 'aws-amplify';
import { listTeams } from '../graphql/queries';
import { API } from 'aws-amplify';

const Notification = ({ notification }) => (
  <TouchableOpacity style={styles.notificationContainer}>
    <View style={styles.leftContainer}>
      <Image style={styles.notificationIcon} source={require('../../assets/profile_icon.png')} />
      <Text style={styles.notificationText}>{notification.text}</Text>
    </View>
    <Image style={styles.rightArrow} source={require('../assets/right-arrow.png')} />
  </TouchableOpacity>
);


const TestScreen = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications from API or database here
    const data = [
      { id: '1', text: 'Notification 1' },
      { id: '2', text: 'Notification 2' },
      { id: '3', text: 'Notification 3' },
      { id: '4', text: 'Notification 4' },
      { id: '5', text: 'Notification 5' },
    ];
    setNotifications(data);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={({ item }) => <Notification notification={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E8E8E8',
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 20,
  },
  notificationText: {
    fontSize: 16,
  },
  rightArrow: {
    width: 20,
    height: 20,
  },
});

export default TestScreen;