import './App.css';
import ParticipantInfo from './components/editParticipant';
import EditMeeting from './components/editMeeting';
import CalendarScreen from './screens/resultScreen';
import { useEffect, useState, text, useContext } from 'react'
import axios from "axios";
import 'react-datepicker/dist/react-datepicker.css';

import { FaArrowRight } from "react-icons/fa";

import { Amplify, API } from 'aws-amplify';
import awsExports from './aws-exports';
import ListItemComponent from './components/listComponent';
import ListMeetingComponent from './components/listComponent/meetingComponent';

import { GlobalContext } from './GlobalContext';
import { GlobalProvider  } from './GlobalContext';
import DateSelector from './components/datePicker';

import SetupScreen from './screens/setupScreen';
import HomeScreen from './screens/homescreen';
import IntervalResult from './screens/intervalResultScreen';

import LandingPage from './screens/landingScreen';


Amplify.configure(awsExports)

function App() {
  return (
      <div style={{marginTop: 30}}>
        <LandingPage />
      </div>
  );
}
export default App;