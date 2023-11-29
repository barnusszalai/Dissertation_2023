import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import DatePicker from 'react-native-date-picker'
import { Ionicons } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import { ScrollView } from 'react-native-gesture-handler';
import { DataContext } from '../../DataContext/DataContext';
import { Amplify } from 'aws-amplify';
import { Button} from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { NavigationContainer } from '@react-navigation/native';

const NewMeetingScreen = ({route, navigation}) => {
  const [meetingTitle, setMeetingTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [earliestStartTime, setEarliestStartTime] = React.useState(new Date());
  const [latestEndTime, setLatestEndTime] = React.useState(new Date());
  const [enableBulk, setEnableBulk] = useState(false)
  const {team} = route.params;

  navigation.setOptions({ title: 'Basic Meeting Information' })

  const [earliestDate, setEarliestDate] = useState(new Date())
  const [latestDate, setLatestDate] = useState(new Date())
  const [invitesBy, setInvitesBy] = useState(new Date())
  const [open, setOpen] = useState(false)

  const [allCompleted, setAllCompleted] = useState(false)

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const [selectedDays, setSelectedDays] = React.useState(daysOfWeek.slice(4));

  const [newMeeting, setNewMeeting] = useState({});

  const changeEarliestDate = (event, selectedDate) => {
    const currentDate = selectedDate || earliestDate;
    //setShow(Platform.OS === 'ios');
    setEarliestDate(currentDate);
  };
  const changeLatestDate = (event, selectedDate) => {
    const currentDate = selectedDate || latestDate;
    //setShow(Platform.OS === 'ios');
    setLatestDate(currentDate);
  };
  const changeEarliestStartTime = (event, selectedTime) => {
    const currentTime = selectedTime || selectedTime;
    //setShow(Platform.OS === 'ios');
    setEarliestStartTime(currentTime);
  };
  const changeLatestEndTime = (event, selectedTime) => {
    const currentTime = selectedTime || selectedTime;
    //setShow(Platform.OS === 'ios');
    setLatestEndTime(currentTime);
  };
  const changeInvitesBy = (event, selectedDate) => {
    const currentTime = selectedDate || invitesBy;
    //setShow(Platform.OS === 'ios');
    setInvitesBy(currentTime);
  };

  const {meetingRequest, updateMeeting} = React.useContext(DataContext);
  //const earliest_date_format = new Date(earliestDate);
  const handleUpdate = () => {
    updateMeeting({
      title: meetingTitle, 
      description: description,
      teamID: team.id,
      earliest_date: earliestDate.toISOString().split('T')[0],
      latest_date: latestDate.toISOString().split('T')[0], 
      earliest_start_time: earliestStartTime.toISOString().split('T')[1].substring(0, 8),
      latest_end_time: latestEndTime.toISOString().split('T')[1].substring(0, 8),
      invites_by: enableBulk ? invitesBy.toISOString().split('T')[0] : null,
      //availableDays: selectedDays,
    });
    navigation.navigate('PeopleScreen', {team: team})
  };

  const DayCheckbox = ({ day, selected, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.checkboxContainer}>
      <MatIcon name={selected ? 'check-box' : 'check-box-outline-blank'} size={24} color="#333" />
      <Text style={styles.dayText}>{day}</Text>
    </TouchableOpacity>
  );


  const EnableBulkSchedulingCheckbox = () => {
    const [checked, setChecked] = useState(false);
  
    const handleCheckboxPress = () => {
      setChecked(!checked);
    };
  
    return (
      <View>
        <CheckBox
          title={<Text style={{color: 'white', fontSize: 16, fontWeight: '600', marginLeft: 10}}>Enable Bulk Scheduling</Text>}
          checked={enableBulk}
          onPress={() => setEnableBulk(!enableBulk)}
          containerStyle={[styles.checkboxContainerEnable, !enableBulk ? {marginBottom: 30} : {marginBottom: 10}]}
          checkedColor={'white'}
          uncheckedColor={'white'}
        />
      </View>
    );
  };

  


  const onDayPress = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };
  

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.inputContainer}>
          <Icon name="format-title" size={20} color="#6e6e6e" />
          <TextInput
            style={styles.input}
            placeholder="Meeting Title"
            value={meetingTitle}
            onChangeText={setMeetingTitle}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="message-outline" size={20} color="#6e6e6e" />
          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            multiline={true}
            numberOfLines={4}
          />
        </View>
        <View style={[styles.dateContainer, {marginTop: -20}]}>
          <Icon style={{marginRight: 10}} name="calendar" size={20} color="#6e6e6e" />
          {/* <TextInput
            style={styles.input}
            placeholder="Earliest Date"
            value={earliestDate}
            onChangeText={setEarliestDate}
          /> */}
          <Text style={{marginRight: 10, fontSize: 15, color: 'grey'}}>Earliest Date: </Text>
          <DateTimePicker
            testID="dateTimePicker"
            value={earliestDate}
            mode="date"
            display="default"
            onChange={changeEarliestDate}
          />
        </View>
        <View style={styles.dateContainer}>
          <Icon style={{marginRight: 10}} name="calendar" size={20} color="#6e6e6e" />
          <Text style={{marginRight: 10, fontSize: 15, color: 'grey'}}>Latest Date: </Text>
          <DateTimePicker
            testID="dateTimePicker"
            value={latestDate}
            mode="date"
            display="default"
            onChange={changeLatestDate}
          />
        </View>
        <View style={styles.dateContainer}>
          <Icon style={{marginRight: 10}} name="clock-outline" size={20} color="#6e6e6e" />
          <Text style={{marginRight: 10, fontSize: 15, color: 'grey'}}>Earliest Start Time: </Text>
          <DateTimePicker
            testID="dateTimePicker"
            value={earliestStartTime}
            mode="time"
            display="default"
            onChange={changeEarliestStartTime}
          />
        </View>
        <View style={[styles.dateContainer, {marginBottom: 20}]}>
          <Icon style={{marginRight: 10}} name="clock-outline" size={20} color="#6e6e6e" />
          <Text style={{marginRight: 10, fontSize: 15, color: 'grey'}}>Latest End Time: </Text>
          <DateTimePicker
            testID="dateTimePicker"
            value={latestEndTime}
            mode="time"
            display="default"
            onChange={changeLatestEndTime}
          />
        </View>
        <View style={styles.container2}>
        {daysOfWeek.map((day) => (
          <DayCheckbox
            key={day}
            day={day}
            selected={selectedDays.includes(day)}
            onPress={() => onDayPress(day)}
          />
        ))}
      </View>
      <EnableBulkSchedulingCheckbox />
        {enableBulk &&
          <View style={[styles.dateContainer, {marginBottom: 70}]}>
            <Icon style={{marginRight: 10}}name="calendar-clock-outline" size={20} color="#6e6e6e" />
            <Text style={{marginRight: 10, fontSize: 15, color: 'grey'}}>Generate Invites By: </Text>
            <DateTimePicker
                testID="dateTimePicker"
                value={invitesBy}
                mode="date"
                display="default"
                onChange={changeInvitesBy}
              />
            
          </View>
        }
        {/* <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PeopleScreen')}>
          <Text style={styles.buttonText}>Invite Participants</Text>
          <Ionicons name="chevron-forward-circle-outline" size={24} style={styles.nextIcon} color="white" />
        </TouchableOpacity> */}
      </ScrollView>
      {meetingTitle && earliestStartTime && latestEndTime
      && earliestDate && latestDate && (selectedDays.length > 0)
      && (invitesBy || !enableBulk) &&
        <TouchableOpacity activeOpacity={1} onPress={handleUpdate} style={[styles.fab]}>
              <Text style={styles.newMeetingButton}>Invite Participants</Text>
              <Ionicons name="chevron-forward-circle-outline" size={24} style={styles.nextIcon} color="white" />
        </TouchableOpacity>
      }
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'top',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#6e6e6e',
        marginBottom: 20,
    },
    dateContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#6e6e6e',
      //marginBottom: 20,
      //marginTop: -20,
    },
    input: {
        flex: 1,
        fontSize: 16,
        marginLeft: 10,
    },
    button: {
        backgroundColor: '#e07a5f',
        alignSelf: 'flex-end',
        alignItems: 'center',
        borderRadius: 4,
        marginTop: 20,
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 18,
        marginRight: 10,
    },
    nextIcon: {
        
    },
    multilineInput: {
        height: 100,
        marginTop: -5,
        textAlignVertical: 'top',
    },
    fab: { 
      position: 'absolute',
      bottom: 20,
      alignItems: 'center', 
      right: 20,
      backgroundColor: '#e07a5f', 
      borderRadius: 30, 
      elevation: 8,
      height: 50, 
      width: 200,
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingRight: 15,
      zIndex: 100,
      flexDirection: 'row',
      alignContent: 'center',
  },
  newMeetingButton: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
},
container2: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 20,
},
checkboxContainer: {
  width: '100%',
  height: 50,
  padding: 10,
  marginVertical: 5,
  flexDirection: 'row',
  alignItems: 'center',
  //justifyContent: 'space-between',
  borderWidth: 1,
  borderRadius: 10,
  borderColor: '#ddd',
},
checkboxContainerEnable: {
  width: '100%',
  height: 50,
  padding: 10,
  //marginVertical: 5,
  flexDirection: 'row',
  alignItems: 'center',
  //justifyContent: 'space-between',
  borderWidth: 1,
  borderRadius: 10,
  borderColor: '#ddd',
  marginLeft: 0,
  backgroundColor: '#a4ac86',
},
dayText: {
  marginLeft: 10,
  fontSize: 16,
  color: '#333',
},
sideButtonContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
},
buttonContainer: {
  margin: 5,
},
button: {
  paddingHorizontal: 20,
},
icon: {
  marginRight: 10,
},
centeredView: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
modalView: {
  backgroundColor: 'white',
  borderRadius: 10,
  padding: 20,
  alignItems: 'center',
  elevation: 5,
},

});

export default NewMeetingScreen;