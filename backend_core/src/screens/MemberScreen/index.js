import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import profile_icon from '../../../assets/profile_icon.png'
import MemberComponent from '../../components/MemberComponent';

const TeamMemberScreen = ({route, navigation}) => {

    const {member, membership} = route.params;

    return (
        <MemberComponent member={member} membership={membership}/>
    );
};

export default TeamMemberScreen;