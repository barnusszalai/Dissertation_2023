import {View, Text, Button, FlatList, StyleSheet, TouchableOpacity, Image, ScrollView, Pressable, Dimensions} from 'react-native';
import TeamItem from '../components/TeamItem'
import MeetingItem from '../components/MeetingItem';
import MeetingRequestItem from '../components/MeetingRequestItem';
import EmployeeItem from '../components/EmployeeItem';
import { useEffect, useState, useContext } from 'react';
import {API, graphqlOperation} from 'aws-amplify';
import { listScheduledMeetings, listMeetings, listTeamUsers, listMemberships } from '../graphql/queries';
import { deleteTeam } from '../graphql/mutations';
import { Ionicons } from '@expo/vector-icons';
import squashImage from '../../assets/squash.jpeg'
import kclLogo from '../../assets/kclPNG.png'
import { SafeAreaView } from 'react-native-safe-area-context';
import { onCreateMembership, onDeleteMembership, onUpdateMembership } from '../graphql/subscriptions';

import { DataContext } from '../DataContext/DataContext';

const TeamScreen = ({route, navigation}) => {
    const {team} = route.params;
    navigation.setOptions({title: team.name})
    const screenHeight = Dimensions.get('window').height;

    const [meetings, setMeetings] = useState([]);
    const [inviteSent, setInviteSent] = useState(false);
    const [members, setMembers] = useState([])
    const [selectedAttribute, setSelectedAttribute] = useState('Description');

    const [meetingRequest, setMeetingRequest] = useState([]);

    useEffect(() => {
        API.graphql(graphqlOperation(listMeetings)).then((result) => {
            const notDeleted = result.data?.listMeetings?.items.filter(item => !item._deleted)
            const seenNames = {}
            const filteredObjects = notDeleted.filter(obj => {
                if (obj.title in seenNames) {
                  return false;
                } else {
                  seenNames[obj.title] = true;
                  return true;
                }
            });
            setMeetings(filteredObjects)
        })
        const deleteSub = API.graphql(graphqlOperation(onDeleteMembership)).subscribe({
            next: ({ value }) => {
                console.warn(members)
                setMembers((m) => m.filter(item => item.id != value.data.onDeleteMembership.id))
            }
        })
        const updateSub = API.graphql(graphqlOperation(onUpdateMembership)).subscribe({
            next: ({ value }) => {
                console.warn(value)
                setMembers((m) => [value.data.onUpdateMembership, ...m.filter(item => item.id != value.data.onUpdateMembership.id)])
            }
        })
        const createSub = API.graphql(graphqlOperation(onCreateMembership)).subscribe({
            next: ({ value }) => {
                console.warn("new team created")
                setMembers((m) => [value.data.onCreateMembership, ...m])
            }
        })
        return () => [deleteSub.unsubscribe(), createSub.unsubscribe(), updateSub.unsubscribe()];
    }, [])

    useEffect(() => {
        API.graphql(graphqlOperation(listMemberships)).then((result) => {
            setMembers(result.data?.listMemberships?.items.filter(item => item.teamID == team.id).filter(item => !item._deleted))
            console.warn(members)
        }).catch(function(error) {
        console.log("errorrr")
        })
    }, [selectedAttribute])

    const NewMeetingRequest = () => (
        <View style={styles.footerComponent}>
            <TouchableOpacity style={styles.footerButton}  onPress={() => navigation.navigate('NewMeetingRequestScreen', {team: team})}>
                <Ionicons name="add-circle-outline" size={24} color="#e07a5f" style={styles.addIcon} />
                <Text style={styles.footerButtonText}>Create New Meeting Request</Text>
            </TouchableOpacity>
        </View>
    );

    const teamMeetings = team.ScheduledMeetings.items

    const renderAttribute = () => {
        navigation.setOptions({headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('EditTeamScreen', {team: team})}>
              <Ionicons name="settings-outline" size={26} />
            </TouchableOpacity>
          ),})
        switch (selectedAttribute) {
          case 'Description':
            return (
              <View style={styles.attributeContainer}>
                <View style={styles.teamLocation}>
                    <View style={styles.row1}>
                        <Text style={styles.teamName}>{team.name}</Text>
                    </View>
                    <View style={styles.row}>
                        <Ionicons style={styles.locationIcon} name="location" size={24} color="grey" />
                        <Text style={styles.locationName}>{team.headquarter}</Text>
                    </View>
                </View>
                <View style={styles.scrollContainer}>
                <View style={[styles.row, {paddingHorizontal: 5}]}>
                    <Text style={styles.teamDescription}>{team.description}</Text>
                </View>
                </View>
              </View>
            );
          case 'Meetings':
            return (
              <SafeAreaView style={styles.attributeContainer}>
                <FlatList
                    data={meetings}
                    renderItem={({ item }) => <MeetingItem meeting={item} />}
                    style={{marginTop: 10}}
                    showsVerticalScrollIndicator={false}
                    // ListFooterComponent={
                    //     <NewMeetingRequest />
                    // }
                />
                <DataContext.Provider value={{ meetingRequest, setMeetingRequest }}>
                    <View style={styles.row1}>
                        <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('NewMeetingRequestScreen', {team: team})} style={[styles.fab_newMeeting, {right: 10}]}>
                            <Ionicons name="add-outline" size={28} style={styles.nextIcon} color="white" />
                            <Text style={styles.newMeetingButton}>New meeting</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('NewMeetingRequestScreen', {team: team})} style={[styles.fab_respond, {left: 0}]}>
                            <Ionicons name="ios-alert-outline" size={28} style={styles.nextIcon} color="white" />
                        </TouchableOpacity> */}


                    </View>
                </DataContext.Provider>
              </SafeAreaView>
            );
            case 'Employees':
                return (
                    <SafeAreaView style={styles.attributeContainer}>
                        <FlatList
                            data={members}
                            renderItem={({ item }) => <EmployeeItem membership={item} />}
                            style={{marginTop: 10}}
                            showsVerticalScrollIndicator={false}
                        />
                        <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('InviteMembersScreen', {team: team, members: members})} style={[styles.fab_newMeeting, {right: 10}]}>
                            <Ionicons name="add-outline" size={28} style={styles.nextIcon} color="white" />
                            <Text style={[styles.newMeetingButton]}>Invite member</Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                )
            default:
                break
        }
      };

    const isMenuActive = (title) => {
        if (title == selectedAttribute) return true;
        return false;
    };


    const handleInvite = () => {
        setInviteSent(true);
        // send invite to team members
    };

    const deleteTeamItem = {
        _version: team._version,
        id: team.id,
    };

    const deleteTeamCall =  async () => {
        const response = await API.graphql(
            graphqlOperation(deleteTeam, {input: deleteTeamItem})
        );
        navigation.goBack();
    };
    return (
        <SafeAreaView style={styles.container}>
            <Image 
                source={kclLogo}
                style={styles.team_avatar}/>
            <View style={styles.innerContainer}>
                

                {/* Invite Members and Delete Team Buttons */}
                {/* <View style={styles.buttonsContainer}>
                    {!inviteSent && (
                    <TouchableOpacity onPress={handleInvite} style={styles.inviteButton}>
                        <Ionicons name="ios-person-add" size={24} color="green" />
                        <Text style={styles.inviteButtonText}>Invite Members</Text>
                    </TouchableOpacity>
                    )}
                    <TouchableOpacity onPress={deleteTeamCall} style={styles.deleteButton}>
                    <Ionicons name="ios-trash" size={24} color="#fff" />
                    <Text style={styles.deleteButtonText}>Delete Team</Text>
                    </TouchableOpacity>
                </View> */}

                {/* Team Menu Item */}
                <View style={styles.menuContainer}>
                    <Pressable
                        style={styles.menuItem}
                        onPress={() => setSelectedAttribute('Description')}>
                        <Text style={[isMenuActive("Description") ? styles.activeMenuText : styles.inActiveMenuText]}>Description</Text>
                    </Pressable>
                    <Pressable style={styles.menuItem} onPress={() => setSelectedAttribute('Meetings')}>
                        <Text style={isMenuActive("Meetings") ? styles.activeMenuText : styles.inActiveMenuText}>Meetings</Text>
                    </Pressable>
                    <Pressable style={styles.menuItem} onPress={() => setSelectedAttribute('Employees')}>
                        <Text style={isMenuActive("Employees") ? styles.activeMenuText : styles.inActiveMenuText}>Employees</Text>
                    </Pressable>
                </View>
                {/* <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('NewMeetingRequestScreen', {team: team})} style={[styles.fab_respond, {left: 20}]}>
                    <Ionicons name="ios-alert-outline" size={28} style={styles.nextIcon} color="white" />
                    <Text style={styles.newMeetingButton}>New Invites</Text>
                </TouchableOpacity> */}
                {renderAttribute()}
            </View>
        </SafeAreaView>
      );
    };
    
    const styles = StyleSheet.create({
        container: {
            backgroundColor: 'white',
            flex: 1,
            paddingTop: -100,
        },
        team_avatar: {
            maxHeight: 200,
            maxWidth: '100%',
            alignSelf: 'center',
            flex: 1,
        },
        innerContainer: {
            paddingHorizontal: 15,
            flex: 2,
        },
        row1: {
            flexDirection: 'row',
        },
        row: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        editRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        teamLocation: {
            padding: 10,
            marginBottom: 40,
        },
        locationIcon: {
            marginRight: 6,
            color: "#E53F71",
        },
        locationName: {
            color: "#E53F71",
        },
        teamName: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 10,
            marginTop: 20,
        },
        descriptionTitle: {
            fontSize: 22,
            fontWeight: '400',
            marginBottom: 15,
        },
        teamDescription: {
            fontSize: 16,
            fontWeight: '200',
            marginBottom: 32,
            flex: 1,
            //flexWrap: 'wrap',
        },
        buttonsContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            //marginTop: 10,
        },
        inviteButton: {
            backgroundColor: '#A1C8AF',
            padding: 12,
            borderRadius: 8,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inviteButtonText: {
            color: 'green',
            fontWeight: 'bold',
            marginLeft: 8,
        },
        deleteButton: {
            backgroundColor: '#E53F71',
            padding: 12,
            borderRadius: 8,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        deleteButtonText: {
            color: '#fff',
            fontWeight: 'bold',
            marginLeft: 8,
        },
        menuContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
            marginBottom: 1,
            borderBottomWidth: StyleSheet.hairlineWidth,
        },
        attributeContainer: {
            flex: 1,
        },
        menuItem: {
            
        },
        inActiveMenuText: {
            color: 'grey',
            fontSize: 20,
            fontWeight: '300',
        },
        activeMenuText: {
            color: 'black',
            fontSize: 20,
            paddingBottom: 20,
            fontWeight: '500',
            //textDecorationLine: 'underline',
            textDecorationStyle: 'solid',
        },
        footerComponent: {
            marginBottom: 50,
        },
        footerButton: {
            backgroundColor: '#fcd5ce',
            shadowOpacity: 0,
            padding: 15,
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 40,
            marginTop: 10,
        },
        editTeamButton: {
            backgroundColor: '#5DBB63',
            shadowOpacity: 0,
            padding: 10,
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
            maxWidth: 140,
        },
        deleteTeamButton: {
            backgroundColor: 'red',
            shadowOpacity: 0,
            padding: 15,
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 40,
            marginTop: 10,
        },
        addIcon: {
            marginLeft: 5,
          },
        footerButtonText: {
            color: '#e07a5f',
            fontSize: 16,
            textAlign: 'center',
            marginLeft: 5,
            fontWeight: '700',
        },
        fab_newMeeting: { 
            position: 'absolute',
            bottom: 20,
            alignItems: 'center', 
            //right: 20,
            backgroundColor: '#e07a5f', 
            borderRadius: 30, 
            elevation: 8,
            height: 50, 
            width: 150,
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            paddingRight: 15,
            zIndex: 100,
            flexDirection: 'row',
            alignContent: 'center',
        },
        fab_respond: { 
            position: 'absolute',
            bottom: 20,
            alignItems: 'center', 
            backgroundColor: 'red', 
            borderRadius: 30, 
            elevation: 8,
            height: 50, 
            width: 140,
            justifyContent: 'center',
            zIndex: 100,
            flexDirection: 'row',
            alignContent: 'center',
        },
        newMeetingButton: {
            color: 'white',
            fontSize: 15,
            fontWeight: '600',
        },
    });

export default TeamScreen;