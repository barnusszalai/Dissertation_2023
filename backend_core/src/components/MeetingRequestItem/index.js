import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
//import { useNavigation } from '@react-navigation/native';

import React from 'react'
import profile_icon from '../../../assets/profile_icon.png'
import { useNavigation } from '@react-navigation/native'

const MeetingRequestItem = ({ meeting }) => {

    const navigation = useNavigation();

    const date = new Date(meeting.earliest_date)
    const month = date.toLocaleDateString('default', {month: 'short'})

    return (
    <Pressable onPress={() => navigation.navigate('Meeting', {meeting: meeting})} style={styles.container}>
        <View style={styles.rightContent}>
            {/* <Text>{meeting.latest_date}</Text> */}
            <Text style={styles.title}>{meeting.title}</Text>
            <View style={styles.workProfile}>
                <View style={styles.categoryContainer}>
                    {meeting.categories?.map(r => <Text style={styles.categoryButton}>{r}</Text>)}
                </View>
            </View>
        </View>
    </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        paddingBottom: 15,
        borderRadius: 10,
        backgroundColor: '#fcd5ce',
    },
    leftContent: {
        //backgroundColor: 'red',
        flexDirection: 'column',
        width: 50,
        //marginHorizontal: 10,
        //paddingHorizontal: 5,
    },
    rightContent: {
        //backgroundColor: 'blue',
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    profile_icon: {
        width: 30,
        height: 30,
        marginHorizontal: 2,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        marginVertical: 10 ,
    },
    category: {
        paddingVertical: 10,
        flex: 1,
    },
    row: {
        flexDirection: 'row',
    },
    workProfile: {
        flexDirection: 'row',
        marginTop: 0,
    },
    categoryContainer: {
        flexDirection: 'row',
        flex: 1,
    },
    categoryButton: {
        //backgroundColor: 'red',
        borderRadius: 10,
        borderColor: '#E55451',
        borderWidth: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        padding: 3,
        //width: 50,
        marginHorizontal: 2,
        alignSelf: 'flex-start',
    },
    date: {
        fontWeight: 'semi-bold',
        fontSize: 30,
    },
    month: {
       fontSize: 18,
    },
    day: {
       
    },

})

export default MeetingRequestItem