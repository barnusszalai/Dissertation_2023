import {View, Text, TextInput, StyleSheet, Button, KeyboardAvoidingView, Platform} from 'react-native';
import MeetingItem from '../../components/MeetingItem';
import { useState } from 'react';


const NewMeetingScreen = () => {
    
    const [newMeetingTitle, setNewMeetingTitle] = useState('');
    const [newMeetingDescription, setNewMeetingDescription] = useState('');

    const onSend = () => {
        console.warn('sending a new message')
    }

    return (
        <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
                style={styles.bg}>
                <Text>Create New Meeting</Text>
                <TextInput 
                    value={newMeetingTitle} 
                    onChangeText={setNewMeetingTitle} 
                    style={styles.titleInput} 
                    placeholder="Meeting name" />
                <TextInput 
                    value={newMeetingDescription} 
                    onChangeText={setNewMeetingDescription}
                    style={styles.descriptionInput} 
                    placeholder="Description" />
                <Button onPress={onSend} title="asd" style={styles.submitButton}></Button>
        </KeyboardAvoidingView>
    ) 
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
    },
    titleInput: {
        marginTop: 30,
        fontSize: 20,
    },
    descriptionInput: {
        marginTop: 20,
        fontSize: 16,
    },
    submitButton: {
        
    },
    bg: {
        //flex: 1,
    }
})

export default NewMeetingScreen;