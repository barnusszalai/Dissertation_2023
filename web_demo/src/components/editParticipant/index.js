import React, { useState, useContext, useEffect } from "react";
import { FaUser, FaCalendarAlt } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import "../../css/ParticipantInfo.css";
import { GlobalContext } from "../../GlobalContext";
import styled from 'styled-components';

import {
  Box,
  TextField,
  Grid,
  Button,
  ButtonGroup,
  Typography,
  List,
  Paper,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { makeStyles } from '@material-ui/core/styles';
import { AddCircle, RemoveCircle } from '@material-ui/icons';
import { WbSunny, Cloud, CloudQueue, CloudOff, FilterDrama, Grain, CloudDownload }
from "@mui/icons-material";
import { FaRegCheckSquare, FaRegSquare } from 'react-icons/fa';


function ParticipantInfo(props) {
  const [selectedParticipant, setSelectedParticipant, addedParticipants, setAddedParticipants] = useContext(GlobalContext);
  const [unavailableSlots, setUnavailableSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');

  const participant_importance_constants = [1, 2, 3]

  // useEffect(() => {
  //   if (selectedParticipant.unavailableSlots) {
  //     setUnavailableSlots(selectedParticipant.unavailableSlots)
  //   }
  // }, [])
  const currentParticipant = addedParticipants.filter(item => item.name===selectedParticipant)
  const daysOfWeek = [
    { id: 1, name: "Sunday", selected: false },
    { id: 2, name: "Monday", selected: true },
    { id: 3, name: "Tuesday", selected: true },
    { id: 4, name: "Wednesday", selected: true },
    { id: 5, name: "Thursday", selected: true },
    { id: 6, name: "Friday", selected: true },
    { id: 7, name: "Saturday", selected: false },
  ];
  const [days, setDays] = useState(daysOfWeek);
  const [timeSlots, setTimeSlots] = useState([]);

  const DayTimeSelector = () => {
  
    const handleButtonClick = (time) => {
      setSelectedTime(time);
    };
  
    return (
      <Box>
        <Typography variant="h8" component="div" gutterBottom>
          Time of Day Preference
        </Typography>
        <ButtonGroup color="primary" aria-label="time of day button group">
          <Button
            variant={selectedTime === 'morning' ? 'contained' : 'outlined'}
            onClick={() => handleButtonClick('morning')}
          >
            Morning
          </Button>
          <Button
            variant={selectedTime === 'afternoon' ? 'contained' : 'outlined'}
            onClick={() => handleButtonClick('afternoon')}
          >
            Afternoon
          </Button>
          <Button
            variant={selectedTime === 'evening' ? 'contained' : 'outlined'}
            onClick={() => handleButtonClick('evening')}
          >
            Evening
          </Button>
        </ButtonGroup>
      </Box>
    );
  };

  const TimeSelector = () => {
    const [startTime, setStartTime] = useState("00:00");
    const [endTime, setEndTime] = useState("00:00");
  
    const handleStartTimeChange = (event) => {
      setStartTime(event.target.value);
    };
  
    const handleEndTimeChange = (event) => {
      setEndTime(event.target.value);
    };
  
    const handleAddTimeSlot = () => {
      setTimeSlots([...timeSlots, { day: 1, startTime, endTime }]);
    };
  
    const handleDeleteTimeSlot = (index) => {
      setTimeSlots(timeSlots.filter((_, i) => i !== index));
    };
  
    return (
      <Box sx={{ width: "100%" }}>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              id="start-time"
              label="Start Time"
              type="time"
              value={startTime}
              onChange={handleStartTimeChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              id="end-time"
              label="End Time"
              type="time"
              value={endTime}
              onChange={handleEndTimeChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
            />
          </Grid>
        </Grid>
        <Box mt={2} textAlign="center">
          <Button variant="contained" style={{backgroundColor: '#800020'}} onClick={handleAddTimeSlot}>
            Add Unavailability
          </Button>
        </Box>
        <Box mt={2}>
          <List>
            {timeSlots.map((slot, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`Time Slot ${index + 1}: ${slot.startTime} - ${slot.endTime}`}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    color="error"
                    onClick={() => handleDeleteTimeSlot(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    );
  };

  

  useEffect(() => {
    const addedItems = []
    const alreadySelectedDays = (addedParticipants.filter((i) => i.name==selectedParticipant))[0].availableDays
    if (alreadySelectedDays) {
      alreadySelectedDays.forEach(function (item, index) {
        setDays([...addedItems, item]);
        addedItems.push(item)
      });
    }
    const participantImportance = addedParticipants.filter((i) => i.name==selectedParticipant)[0].importance
    setSelectedImportance(participantImportance==participant_importance_constants[0] ? 'Low' : participantImportance==participant_importance_constants[1] ? 'Medium' : 'High')
    const addedSlots = []
    const alreadySelectedSlots = (addedParticipants.filter((i) => i.name==selectedParticipant))[0].unavailableSlots
    if (alreadySelectedSlots) {
      alreadySelectedSlots.forEach(function (item, index) {
        setTimeSlots([...addedSlots, item]);
        addedSlots.push(item)
    });
    }


  console.warn(days)
}, [selectedParticipant])
  
  
  const WeekDays = () => {
    const [selectedParticipant, setSelectedParticipant, addedParticipants, setAddedParticipants] = useContext(GlobalContext);
    const handleDayClick = (id) => {
      setDays(
        days.map((day) =>
          day.id === id ? { ...day, selected: !day.selected } : day
        )
      );
    };
  
    return (
      <Grid container justifyContent="center" spacing={2}>
        {days.map((day) => (
          <Grid key={day.id} item xs={12} sm={4} md={4}>
            <Paper
              elevation={day.selected ? 4 : 1}
              onClick={() => handleDayClick(day.id)}
              sx={{
                padding: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: day.selected ? "#1db954" : "background.paper",
                color: day.selected ? "primary.contrastText" : "text.primary",
                cursor: "pointer",
                width: "80%",
                height: 60,
              }}
            >
              <WbSunny />
              <Typography variant="body1" sx={{ marginTop: 1 }}>
                {day.name}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    );
  };
  


  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: '30px',
      alignItems: 'center',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    slot: {
      display: 'flex',
      alignItems: 'center',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));
  const [selectedImportance, setSelectedImportance] = useState('');
  const ImportanceButtonGroup = () => {
  
    const handleClick = (importance) => {
      setSelectedImportance(importance)
    };
  
    return (
      <Box display="flex" alignItems="center">
        <Typography variant="body1" mr={2}>
          Importance:
        </Typography>
        <ButtonGroup variant="outlined" color="primary">
          {['Low', 'Medium', 'High'].map((importance) => (
            <Button
              key={importance}
              onClick={() => handleClick(importance)}
              variant={selectedImportance === importance ? 'contained' : 'outlined'}
            >
              {importance}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
    );
  };

  function saveParticipant() {
    setAddedParticipants((prevList) =>
      prevList.map((item) =>
        item.name === selectedParticipant ? { 
          ...item, 
          availableDays: days, 
          unavailableSlots: timeSlots, 
          importance: selectedImportance=='Low' ? participant_importance_constants[0] : selectedImportance=='Medium' ? participant_importance_constants[1] : participant_importance_constants[2],
          preferred_time_of_day: selectedTime,
        } : item
      )
    );
    console.warn(addedParticipants)
    setSelectedParticipant('')
  }

  return (
    <div className="participant-info">
        
      <div className="participant-info__header">
        <FaUser className="participant-info__icon" />
        <span className="participant-info__title">Participant Info</span>
        <MdClose className="participant-info__icon" onClick={() => setSelectedParticipant('')}/>
      </div>
      <div className="participant-info__body">
        <div className="participant-info__row">
          <FaUser className="participant-info__field-icon" />
          <label className="participant-info__label">Name:</label>
          <input
            type="text"
            value={selectedParticipant}
            onChange={(event) => setSelectedParticipant(event.target.value)}
            className="participant-info__input"
          />
        </div>
      </div>
          <div style={{marginBottom: 20}}>
            <ImportanceButtonGroup />
          </div>
          {props.usingIntervals &&
          <div>
            <div style={{marginBottom: 20}}>
              <DayTimeSelector />
            </div>
          </div>
          }
      {/* <WeekDays /> */}
      <div style={{marginTop: 20}}>
        <TimeSelector />
      </div>
      <div className="participant-info__actions">
        <button onClick={saveParticipant} className="participant-info__button">Save</button>
        <button onClick={() => setSelectedParticipant('')} className="participant-info__button">Cancel</button>
      </div>
    </div>
  );
}




export default ParticipantInfo;
