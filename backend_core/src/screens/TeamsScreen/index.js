import {FlatList, View, Text, StyleSheet, Button, TextInput, TouchableOpacity} from 'react-native';
import TeamItem from '../../components/TeamItem'
import { Entypo } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'
import { getUser, listTeams, listUsers } from '../../graphql/queries';
import { Amplify, Auth, API, graphqlOperation } from 'aws-amplify'
import { SafeAreaView } from 'react-native-safe-area-context';
import { createUser } from '../../graphql/mutations';
import { onCreateTeam, onDeleteTeam, onUpdateTeam } from '../../graphql/subscriptions';

const categoryList = ["Workout", "Home"]
let exampleTeam = {name:"King's College London", members: ["Barni", "Joseph", "David"], image: 'kclImage'};
let exampleTeam2 = {name:"OTP Bank", members: ["Barni", "Micheal"], image: 'otpImage'};
//let teams = [exampleTeam, exampleTeam2];


const asd = (input) => {
    return (input * 2)
}


export default function TeamsScreen({route, navigation}) {

    const [teams, setTeams] = useState([]);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        API.graphql(graphqlOperation(listTeams)).then((result) => {
            console.warn(result.data.listTeams);
            setTeams(result.data?.listTeams?.items.filter(item => !item._deleted));
        }).catch(function(error) {
            console.log("errorrr")
        });
        API.graphql(graphqlOperation(listUsers)).then((result) => {
            console.warn(result.data.listUsers);
            setUsers(result.data?.listUsers?.items);
        }).catch(function(error) {
            console.log("errorrr")
        });
        const subscription = API.graphql(graphqlOperation(onCreateTeam)).subscribe({
            next: ({ value }) => {
                console.warn("new team created")
                setTeams((m) => [value.data.onCreateTeam, ...m])
            }
        })
        return () => subscription.unsubscribe();
    }, [])
    useEffect(() => {
        const subDelete = API.graphql(graphqlOperation(onDeleteTeam)).subscribe({
            next: ({ value }) => {
                console.warn(value.data.onDeleteTeam)
                setTeams((m) => m.filter(x => x.id != value.data.onDeleteTeam.id));
            }
        })

        const subUpdate = API.graphql(graphqlOperation(onUpdateTeam)).subscribe({
            next: ({ value }) => {
                setTeams((m) => [value.data.onUpdateTeam, ...m.filter(item => item.id != value.data.onUpdateTeam.id)])
            }
        })
        return () => [subUpdate.unsubscribe(), subDelete.unsubscribe];
    }, [])

    const AddTeam = () => {
        const [teamName, setTeamName] = useState('');
      
        return (
          <View style={styles.container2}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate('CreateNewTeam')}
            >
                <Entypo style={styles.addIcon} name="plus" size={22} />
                <Text style={styles.buttonText}>New Team</Text>
            </TouchableOpacity>
          </View>
        );
      };
      
      
      

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.title}>Teams</Text>
            </View>
            <View style={styles.listView}>
            <FlatList
                style={styles.list}
                data={teams}
                renderItem={({ item }) => <TeamItem team={item} />}
                ListFooterComponent={<AddTeam />}
            />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    list: {
        backgroundColor: '#F8F8F8',
        borderRadius: 15,
        paddingTop: 20,
        flexGrow: 1,
    },
    listView: {
        backgroundColor: '#F8F8F8',
        marginBottom: 0,
        flex: 1,
    },
    title: {
        fontSize: 26,
        adjustFontSizeToFit: true,
        marginHorizontal: 20,
        marginBottom: 20,
        marginTop: 20,
        flex: 1,
    },
    addNewTeamButton: {
        alignSelf: 'flex-end',
        //marginHorizontal: 30,
        margin: 20,
        textAlign: 'center',
        marginTop: 'auto',
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: StyleSheet.hairlineWidth,
        //marginBottom: 30,
    },
    currentDate: {
       marginHorizontal: 30,
       alignSelf: 'center',
    },
    container2: {
        
      },
    addButton: {
        backgroundColor: '#A1C8AF',
        shadowOpacity: 0,
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 40,
        marginTop: 10,
      },
      addIcon: {
        marginLeft: 5,
        color: 'green',
        fontWeight: '900',
      },
      buttonText: {
        color: 'green',
        fontSize: 16,
        textAlign: 'center',
        marginLeft: 5,
        fontWeight: '800',
      },
});