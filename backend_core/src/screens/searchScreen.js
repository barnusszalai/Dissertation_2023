import {FlatList, View, Text, StyleSheet} from 'react-native';
import TeamItem from '../components/TeamItem'
import { AntDesign } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'
import { listTeams } from '../graphql/queries';
import {API, graphqlOperation} from 'aws-amplify';

const categoryList = ["Workout", "Home"]
let exampleTeam = {name:"King's College London", members: ["Barni", "Joseph", "David"], image: 'kclImage'};
let exampleTeam2 = {name:"OTP Bank", members: ["Barni", "Micheal"], image: 'otpImage'};
//let teams = [exampleTeam, exampleTeam2];




export default function SearchScreen({route, navigation}) {
    navigation.setOptions({title: "Search"})
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.title}>Search</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingBottom: 60,
    },
    list: {
        
    },
    title: {
        fontSize: 26,
        adjustFontSizeToFit: true,
        marginHorizontal: 20,
        marginBottom: 20,
        marginTop: 20,
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: 30,
    },
    currentDate: {
       marginHorizontal: 30,
       alignSelf: 'center',
    },
});