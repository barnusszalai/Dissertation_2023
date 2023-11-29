import React, { useEffect, useState, useContext } from 'react';
import '../../css/calendar.css'
import Calendar from '../../components/calendarComponent';
import { GlobalContext } from '../../GlobalContext';
import axios from "axios";

// const meetings = ["M0", "M1", "M2"]

// const participants = {
//     "Tom Peterson" : {
//         "9:00" : "M1"
//     },
//     "Barnabas Szalai" : {
//         "9:00" : "M1",
//         "11:00" : "M2"
//     },
//     "John White" : {
//         "11:00" : "M2",
//         "14:00" : "M3"
//     },
//     "Marko Polo" : {
//         "14:00" : "M3",
//         "15:00" : "M4"
//     }
// }


const CalendarScreen = (props) => {

    const [participants, setParticipants] = useState({})
    const [meetings, setMeetings] = useState({})
    const [selectedParticipant, setSelectedParticipant, addedParticipants, setAddedParticipants, selectedMeeting, setSelectedMeeting, addedMeetings, setAddedMeetings] = useContext(GlobalContext);


    const dataToPassApi = {participants: addedParticipants, meetings: addedMeetings}
    console.log(dataToPassApi)
    useEffect(() => {
        if(!props.greedySelected) {
            axios
            .put("http://prj-backend.herokuapp.com/testapi/basic_meetingrequest/", dataToPassApi)
            .then((res) => [console.warn(res.data.data), setParticipants(res.data.data.result), setMeetings(res.data.data.allMeetings)])
            .catch((err) => console.log(err));
        } else {
            axios
            .put("http://prj-backend.herokuapp.com/testapi/greedy_meetingrequest/", dataToPassApi)
            .then((res) => [console.warn(res.data.data), setParticipants(res.data.data.result), setMeetings(res.data.data.allMeetings)])
            .catch((err) => console.log(err));
        }
    }, [])

    console.warn(participants)
    


    const items = []
    Object.keys(participants).forEach(key => {
        console.warn("key: " + addedParticipants)
        items.push(
            <Calendar participantName={addedParticipants[key].name} meetings={participants[key]} allMeetings={meetings} />
        //   <View key={key}>
        //     <Text>{key}: {myDict[key]}</Text>
        //   </View>
        );
    })


  return (
    <div>
        <Calendar participantName={""}/>
        {items}
        {/* <Calendar participantName={""}/>
        <Calendar participantName={"Tom Peterson"}/>
        <Calendar participantName={"Barnabas Szalai"}/>
        <Calendar participantName={"John White"}/>
        <Calendar participantName={"Elizabeth Heathrow"}/> */}
    </div>
  );
};

export default CalendarScreen;

