import '../../App.css';
import ParticipantInfo from '../../components/editParticipant';
import EditMeeting from '../../components/editMeeting';
import CalendarScreen from '../resultScreen';
import IntervalResult from '../intervalResultScreen';
import { useEffect, useState, text, useContext } from 'react'
import axios from "axios";
import 'react-datepicker/dist/react-datepicker.css';

import { FaArrowRight } from "react-icons/fa";

import { Amplify, API } from 'aws-amplify';
import awsExports from '../../aws-exports';
import ListItemComponent from '../../components/listComponent';
import ListMeetingComponent from '../../components/listComponent/meetingComponent';
import { GlobalContext, GlobalProvider } from '../../GlobalContext';
import DateSelector from '../../components/datePicker';


Amplify.configure(awsExports)

function SetupScreen(props) {
  const myInit = {
    headers: {},
    reponnse: true,
  }



 const [generateClicked, setGenerateClicked] = useState(false)
 const [usingIntervals, setUsingIntervals] = useState(props.usingIntervals)
 const [greedySelected, setGreedySelected] = useState(props.greedySelected)



  const [test, setTest] = useState([])

  function DisplayPage() {
    const [selectedParticipant, setSelectedParticipant, addedParticipants, setAddedParticipants, selectedMeeting, setSelectedMeeting, addedMeetings, setAddedMeetings] = useContext(GlobalContext);

    const scheduledMeetings = {}

    function generateSchedules() {
      

      setGenerateClicked(!generateClicked)
  
      const backendResponse = API.get('schedulingalg', '/test', myInit).then((response) => {
        console.warn(backendResponse)
      }).catch((error) => {
        console.log(error.response)
      })
    }

    if (!generateClicked) {
      return (
        <div style={{alignItems: 'center', alignSelf: 'center', alignContent: 'center', justifyContent: 'center'}}>
          <div style={{marginTop: 30}}>
            <div style={{display: '-webkit-inline-flex', alignContent: 'center'}}>
              <text>{test[0]?.id}</text>
              <ListItemComponent title={"Team Name"}/>
              <ListItemComponent title={"Participants"} />
              <ListMeetingComponent title={"Meeting Requests"}/>
              {selectedParticipant &&
                <ParticipantInfo usingIntervals={usingIntervals}/>
              }
              {selectedMeeting &&
                <EditMeeting usingIntervals={usingIntervals} />
              }
            </div>
          </div>
          <div style={{marginTop: 40, marginLeft: 20, flexDirection: 'row', display: 'flex'}}>
            
            <button style={buttonStyle} onClick={generateSchedules}>Generate Schedules</button>
          </div>
        </div>
        )
    } 
    
    if(scheduledMeetings) {
      if(usingIntervals) {
        return (
          <div style={{marginTop: 30, marginLeft: 10, textAlign: 'center'}}>
            <div style={{marginBottom: 50}}>
              <button style={buttonStyle} onClick={() => setGenerateClicked(!generateClicked)}>Edit Setup</button>
            </div>
            <IntervalResult />
          </div>
        )
      } else {
        if(!greedySelected) {
          return (
            <div style={{marginTop: 30, marginLeft: 10, textAlign: 'center'}}>
              <button style={buttonStyle} onClick={() => setGenerateClicked(!generateClicked)}>Edit Setup</button>
              <CalendarScreen scheduledMeetings={scheduledMeetings} reedySelected={greedySelected}/>
            </div>
          )
        } else {
          return (
            <div style={{marginTop: 30, marginLeft: 10, textAlign: 'center'}}>
              <button style={buttonStyle} onClick={() => setGenerateClicked(!generateClicked)}>Edit Setup</button>
              <CalendarScreen scheduledMeetings={scheduledMeetings} greedySelected={greedySelected}/>
            </div>
          )
        }
      }
    }
  }

  return (
      <DisplayPage />
  );
}

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};

const buttonStyle = {
  backgroundColor: "#800020",
  color: "white",
  padding: "12px 24px",
  borderRadius: "4px",
  border: "none",
  fontSize: "16px",
  cursor: "pointer",
  boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
  alignItems: 'center',
  fontWeight: "bold",
  justifyContent: 'center',
  textAlign: 'center',
};

export default SetupScreen;