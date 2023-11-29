import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import profile_icon from '../../../assets/profile_icon.png';
import { updateMembership } from '../../graphql/mutations';
import { deleteMembership } from '../../graphql/mutations';
import { useNavigation } from '@react-navigation/native';

import { API, graphqlOperation } from 'aws-amplify';

const MemberComponent = ({ member, membership }) => {
  const [position, setPosition] = useState(membership.position);
  const [department, setDepartment] = useState(membership.department);
  const navigation = useNavigation();
  const joinedDate = new Date(new Date(membership.createdAt).getTime()).toLocaleDateString();

  const removeMember = () => {
    console.warn(membership._version)
    API.graphql(graphqlOperation(deleteMembership, { input: {id: membership.id, _version: membership._version} })).then((result) => {
        console.warn(result)
        navigation.goBack();
    }).catch(function(error) {
        console.warn("errorrr")
    });

  };

  const updateMember = () => {

    const input = {
        id: membership.id,
        position: position,
        department: department,
        _version: membership._version,
      };
    
    API.graphql(graphqlOperation(updateMembership, { input: input })).then((result) => {
        console.warn(result)
    });

  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      bounces={false}
    >
      <View style={styles.header}>
        <Avatar
          source={profile_icon}
          size="xlarge"
          rounded
          containerStyle={styles.avatar}
        />
        <Text style={styles.name}>
          {member?.first_name} {member?.last_name}
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Icon name="business" type="material" size={25} color="#000" />
          <TextInput
            style={styles.textInput}
            value={department}
            onChangeText={(text) => setDepartment(text)}
            placeholder="Department"
          />
        </View>
        <View style={styles.infoItem}>
          <Icon name="work" type="material" size={25} color="#000" />
          <TextInput
            style={styles.textInput}
            value={position}
            onChangeText={(text) => setPosition(text)}
            placeholder="Position"
          />
        </View>
        <View style={styles.infoItem}>
          <Icon name="date-range" type="material" size={25} color="#000" />
          <Text style={styles.infoText}>Joined: {joinedDate}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.updateButton} onPress={updateMember}>
          <Icon name="update" type="material" size={25} color="#ffffff" />
          <Text style={styles.buttonText}>Update Member</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.removeButton} onPress={removeMember}>
          <Icon name="delete" type="material" size={25} color="#ffffff" />
          <Text style={styles.buttonText}>Remove Member</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 30,
    backgroundColor: '#ffffff',
  },
  avatar: {
    marginBottom: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  infoContainer: {
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
},
infoText: {
fontSize: 18,
marginLeft: 10,
},
textInput: {
flex: 1,
marginLeft: 10,
borderBottomWidth: 2,
borderBottomColor: '#000',
fontSize: 18,
paddingBottom: 5,
},
buttonContainer: {
flexDirection: 'row',
justifyContent: 'space-between',
position: 'absolute',
bottom: 20,
width: '100%',
paddingHorizontal: 5,
},
updateButton: {
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'center',
backgroundColor: '#4CAF50',
borderRadius: 5,
paddingVertical: 10,
paddingHorizontal: 15,
},
removeButton: {
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'center',
backgroundColor: '#f44336',
borderRadius: 5,
paddingVertical: 10,
paddingHorizontal: 15,
},
buttonText: {
fontSize: 16,
color: '#ffffff',
marginLeft: 10,
},
});

export default MemberComponent;
