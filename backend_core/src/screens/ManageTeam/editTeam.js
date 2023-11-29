import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import profile_icon from '../../../assets/profile_icon.png'
import TeamSettings from '../../components/EditTeam';

const EditTeamScreen = ({route, navigation}) => {

    const {team} = route.params;

    return (
        <TeamSettings team={team}/>
    );
};

export default EditTeamScreen;