import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Ionicons } from '@expo/vector-icons';
import { DataContext } from '../../DataContext/DataContext';
import { createScheduledMeeting, createUserScheduledMeeting } from '../../graphql/mutations';
import { listTeamUsers, listUsers, membershipsByTeamID } from '../../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';

const people = [
  { name: 'John Doe', id: '1' },
  { name: 'Jane Doe', id: '2' },
  { name: 'Jim Smith', id: '3' },
  { name: 'Jill Smith', id: '4' },
  { name: 'John Smith', id: '5' },
];

const PeopleScreen = ({route, navigation }) => {
  const [selectedPeople, setSelectedPeople] = React.useState([]);
  const [selectedOptionalPeople, setSelectedOptionalPeople] = React.useState([]);
  const [members, setMembers] = React.useState([]);
  const {team} = route.params;


  navigation.setOptions({headerShown: false})

    useEffect(() => {
      API.graphql(graphqlOperation(membershipsByTeamID, {teamID: team.id})).then((result) => {
        const ids = result.data?.membershipsByTeamID?.items?.map(item => item.userID)
        console.warn(ids)
        API.graphql(graphqlOperation(listUsers)).then((result2) => {
          console.warn(result2)
          setMembers(result2?.data?.listUsers?.items.filter(item => ids.includes(item.id)))
          console.warn(members)
        })
      }).catch(function(error) {
        console.log("errorrr")
      })
    }, [])

  const toggleSelection = (person) => {
    if (selectedPeople.includes(person)) {
      setSelectedPeople(selectedPeople.filter((p) => p !== person));
      setSelectedOptionalPeople([...selectedOptionalPeople, person]);
    } else if (selectedOptionalPeople.includes(person)) {
        setSelectedOptionalPeople(selectedOptionalPeople.filter((p) => p !== person));
    } else {
        setSelectedPeople([...selectedPeople, person]);
    }
  };

  const {meetingRequest, updateMeeting} = React.useContext(DataContext);

  const handleUpdate = () => {
    updateMeeting(existingValues => ({
      // Retain the existing values
      ...existingValues,
      // add selected people
      //invitedPeople: [selectedPeople],
    }))
    console.warn(meetingRequest)
    createMeeting();
  };
  
  const createMeeting = () => {
    API.graphql(graphqlOperation(createScheduledMeeting, {input: meetingRequest})).then((result) => {
      console.warn(result)
      selectedPeople.forEach(person => {
        API.graphql(graphqlOperation(createUserScheduledMeeting, {input: {
          scheduledMeetingId: result.data?.createScheduledMeeting?.id, 
          userId: person
        }}))
      })
    })
    navigation.goBack()
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedPeople.includes(item.id);
    const isSelectedOptional = selectedOptionalPeople.includes(item.id);

    return (
      <TouchableOpacity activeOpacity={1} style={[,styles.itemContainer, isSelected||isSelectedOptional ? {backgroundColor: '#e9ecef'} : {}] } onPress={() => toggleSelection(item.id)}>
        <Text></Text>
        <View style={styles.imageText}>
            <Image
            source={{ uri: 'https://picsum.photos/50' }}
            style={styles.avatar}
            />
            <Text style={styles.itemName}>{item.first_name} {item.last_name}</Text>
        </View>
        {isSelected && (
            <Icon name="check-circle" size={28} style={styles.checkIcon} color="#e07a5f" />
        )}
        {isSelectedOptional && (
            <Icon name="check-circle" size={28} style={styles.checkIcon} color="#ffb703" />
        )}
        {!isSelected && !isSelectedOptional && (
            <Icon name="circle-outline" size={28} style={styles.checkIcon} color="grey" />
        )}
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.titleText, {fontSize: 22}]}>{meetingRequest.title}</Text>
        <Text style={[styles.titleText, {fontSize: 18, fontWeight: '700', opacity: 0.8, color: '#800020', marginBottom: 30}]}>Invite some of your colleagues!</Text>
      </View>
      <FlatList
        data={members}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={[styles.list, ((selectedPeople.length>0 || selectedOptionalPeople.length>0) ? {marginBottom: 120}: {})]}
      />
      {(selectedPeople.length>0 || selectedOptionalPeople.length>0) && (
        <TouchableOpacity onPress={handleUpdate} style={styles.fab}>
            <Text style={styles.buttonText}>Create Meeting Request</Text>
            <Ionicons name="chevron-forward" size={24} style={styles.nextIcon} color="white" />
        </TouchableOpacity>
      )}
      {/* <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PeopleScreen')}>
        <Text style={styles.buttonText}>Invite Participants</Text>
        <Ionicons name="chevron-forward-circle-outline" size={24} style={styles.nextIcon} color="white" />
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleText: {
    marginTop: 10,
    marginHorizontal: 10,
    textAlign: 'center',
  },
  list: {
    flex: 1,
  },
  selectedItem: {
    backgroundColor: '#eee',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderRadius: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20,
    },
    itemName: {
        fontSize: 16,
    },
    button: {
        backgroundColor: '#2089dc',
        padding: 20,
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#e07a5f',
        alignSelf: 'flex-end',
        alignItems: 'center',
        borderRadius: 4,
        marginTop: 20,
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
        marginRight: 10,
    },
    checkIcon: {
        marginRight: 10,
    },
    nextIcon: {
        
    },
    imageText: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
    fab: { 
        position: 'absolute', 
        alignItems: 'center', 
        justifyContent: 'center', 
        alignSelf: 'center',
        bottom: 20, 
        backgroundColor: '#800020', 
        borderRadius: 30, 
        elevation: 8,
        height: 56, 
        width: 280,
        flexDirection: 'row'
    }, 
    fabIcon: { 
        fontSize: 40, 
        color: 'white',
        alignSelf: 'center',
    }
});

export default PeopleScreen;