import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Amplify, Auth, API, graphqlOperation } from 'aws-amplify'
import { createTeam, createMembership } from '../../graphql/mutations';
import { listTeams } from '../../graphql/queries';
import { DataContext } from '../../DataContext/DataContext';

const CreateTeamScreen = ({route, navigation}) => {

    const [name, setName] = useState('');
    const [headquarter, setHeadquarter] = useState('');
    const [description, setDescription] = useState('');

    const [teamNames, setTeamNames] = useState([]);

    const {currentUser, setCurrentUser} = React.useContext(DataContext);

    useEffect(() => {
        API.graphql(graphqlOperation(listTeams)).then((result) => {
            console.warn(result.data.listTeams);
            setTeamNames(result.data?.listTeams?.items.filter(team => !team._deleted).map(team => team.name));
        }).catch(function(error) {
            console.log("errorrr")
        });
    }, []);

    const newTeam = {
        name: name,
        headquarter: headquarter,
        description: description,
        avatar: "noAvatar"
    }
    
  const handleSubmit = () => {
    if(teamNames.includes(name)) return console.warn("team name already exists!")
    API.graphql(graphqlOperation(createTeam, {input: newTeam})).then((result) => {
      console.warn(result.data?.createTeam?.id)
      API.graphql(graphqlOperation(createMembership, {input: {
        userID: currentUser.id, 
        teamID: result.data?.createTeam?.id,
        department: 'Technology',
        position: "Software Engineer",
        importance: 2,
      }}))
    })
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter team name"
      />

      <Text style={styles.label}>Headquarter</Text>
      <TextInput
        style={styles.input}
        value={headquarter}
        onChangeText={setHeadquarter}
        placeholder="Enter headquarter location"
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter team description"
        multiline={true}
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Create Team</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    marginTop: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#800020',
    padding: 15,
    borderRadius: 15,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CreateTeamScreen;
