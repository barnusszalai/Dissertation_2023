import { View, Text, Image, StyleSheet, Pressable, ListView, ListViewComponent } from 'react-native'
//import { useNavigation } from '@react-navigation/native';
import { membershipsByTeamID, listMemberships, getTeam } from '../../graphql/queries';
import { createMembership } from '../../graphql/mutations'
import { useState, useEffect } from 'react';
import {API, graphqlOperation} from 'aws-amplify';
import AntDesign from 'react-native-vector-icons/AntDesign';

import React from 'react'
import kclImage from '../../../assets/kcl.jpeg'
import otpImage from '../../../assets/otpbank.png'
import profile_icon from '../../../assets/profile_icon.png'
import { useNavigation } from '@react-navigation/native'
import { FlatList } from 'react-native-gesture-handler';

const TeamItem = ({ team }) => {


    let image = otpImage
    //if (team.avatar == 'kclImage') {
        image = kclImage
    //}
    const [members, setMembers] = useState([]);

    console.log(team.Memberships)

    const navigation = useNavigation();

    const newMembership = {
        
    }

    const onSend = async () => {
        await API.graphql(graphqlOperation(listMemberships, {input: newMembership}));
    }

    return (
    <Pressable onPress={() => navigation.navigate('Team', {team: team})} style={styles.container}>
        <View style={styles.container}>
            <View style={styles.item}>
                <Image 
                            source={image}
                            style={styles.profile_icon}/>
                <View style={styles.content}>
                    <Text style={styles.title}>{team.name}</Text>
                    <View style={styles.row}>
                        <Image 
                                source={profile_icon}
                                style={styles.team_member_icon}/>
                        <Image 
                                source={profile_icon}
                                style={styles.team_member_icon}/>
                        <Text style={styles.membersText}>{team.Memberships.items.filter(x => !x ._deleted).length} members</Text>
                    </View>
                    <View style={styles.row}>
                        <AntDesign name="notification" size={16} color='#800020' />
                        <Text style={styles.teamNotification}>2 new Meeting Request!</Text>
                    </View>
                </View>
            </View>
        </View>
    </Pressable>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        height: 160,
        borderColor: 'gray',
        borderWidth: StyleSheet.hairlineWidth,
        marginHorizontal: 20,
        borderRadius: 15,
        flexDirection: 'row',
        overflow: 'hidden',
        marginBottom: 20,
    },
    title: {
       fontSize: 20,
       marginBottom: 2,
       fontWeight: '500'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
    },
    membersText: {
        fontSize: 14,
        fontWeight: '300'
    },
    content: {
        marginLeft: 30,
        alignSelf: 'top',
        marginTop: 30,
        flexDirection: 'column',
    },
    profile_icon: {
        height: 110,
        width: 110,
        borderRadius: 80,
        borderWidth: StyleSheet.hairlineWidth,
        marginLeft: 10,
        alignSelf: 'center',
    },
    team_member_icon: {
        height: 20,
        width: 20,
        marginRight: 5,
    },
    teamNotification: {
        marginHorizontal: 5,
        color: '#800020',
    },

})

export default TeamItem