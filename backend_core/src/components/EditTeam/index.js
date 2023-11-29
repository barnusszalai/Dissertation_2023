
import React, { useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Input, Avatar, Button, Icon } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import profile_icon from '../../../assets/squash.jpeg';
import { useNavigation } from '@react-navigation/native'
import { updateTeam, deleteTeam } from '../../graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';

const TeamSettings = ({ team }) => {
  const [title, setTitle] = useState(team.name);
  const [description, setDescription] = useState(team.description);
  const [headquarter, setHeadquarter] = useState(team.headquarter);
  const [avatar, setAvatar] = useState(team.avatar);

  const navigation = useNavigation();
  navigation.setOptions({ title: (team.name + " Settings") })

  const chooseAvatar = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setAvatar(response.uri);
      }
    });
  };

  const updateSettings = () => {
    const input = {
        id: team.id,
        name: title,
        headquarter: headquarter,
        description: description,
        _version: team._version,
      };
    
    API.graphql(graphqlOperation(updateTeam, { input: input })).then((result) => {
        console.warn(result)
    });
  };

  const deleteTeamSetting = () => {
    API.graphql(graphqlOperation(deleteTeam, { input: {id: team.id, _version: team._version} })).then((result) => {
        navigation.popToTop();
    }).catch(function(error) {
        console.warn("errorrr")
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar
          size="xlarge"
          rounded
          source={profile_icon}
          showEditButton
          onEditPress={chooseAvatar}
        />
      </View>
      <View style={styles.inputContainer}>
        <Input
          label="Title"
          value={title}
          onChangeText={setTitle}
        />
        <Input
          label="Description"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />
        <Input
          label="Headquarter"
          value={headquarter}
          onChangeText={setHeadquarter}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Update Settings"
          onPress={updateSettings}
          buttonStyle={styles.updateButton}
          icon={
            <Icon
              name="save"
              type="material"
              size={20}
              color="white"
              containerStyle={styles.iconStyle}
            />
          }
        />
        <Button
          title="Delete Team"
          onPress={deleteTeamSetting}
          buttonStyle={styles.deleteButton}
          icon={
            <Icon
              name="delete"
              type="material"
              size={20}
              color="white"
              containerStyle={styles.iconStyle}
            />
          }
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  avatarContainer: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
  },
  inputContainer: {
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  buttonContainer: {
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  updateButton: {
    backgroundColor: '#097969',
    opacity: 0.7,
    marginBottom: 15,
    height: 50,
    borderRadius: 15,
  },
  deleteButton: {
    backgroundColor: '#800020',
    height: 50,
    borderRadius: 15,
  },
  iconStyle: {
    marginRight: 10,
  },
});

export default TeamSettings;
