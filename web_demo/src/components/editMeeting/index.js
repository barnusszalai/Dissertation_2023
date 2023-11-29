import { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { FaUser, FaCalendarAlt, FaBuilding } from "react-icons/fa";
import { MdClose } from "react-icons/md";

import { GlobalContext } from '../../GlobalContext';

// const participants = [
//   { id: 1, name: 'John' },
//   { id: 2, name: 'Mary' },
//   { id: 3, name: 'Bob' },
//   { id: 4, name: 'Alice' },
// ];

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


function EditMeeting(props) {
    const participants = ["asd", "dddddd", "Bob"]
    const [selectedParticipant, setSelectedParticipant, addedParticipants, setAddedParticipants, selectedMeeting, setSelectedMeeting, addedMeetings, setAddedMeetings] = useContext(GlobalContext);
    const [meetingLength, setMeetingLength] = useState(30);

    const [selected, setSelected] = useState([]);
    useEffect(() => {
        //setSelected((addedMeetings.filter((i) => i.name==selectedMeeting))[0].invitedParticipants)
        setSelected([])
        const addedItems = []
        const alreadySelectedMeetings = (addedMeetings.filter((i) => i.name==selectedMeeting))[0].invitedParticipants
        if(alreadySelectedMeetings) {
            alreadySelectedMeetings.forEach(function (item, index) {
                setSelected([...addedItems, item]);
                addedItems.push(item)
            });
            console.warn(alreadySelectedMeetings)
        }
    }, [selectedMeeting])
    
    

  function handleItemClick(item) {
    console.warn(item.name)
    const isSelected = selected.includes(item.name);
    if (isSelected) {
      setSelected(selected.filter((i) => i !== item.name));
    } else {
      setSelected([...selected, item.name]);
    }
  }

  function MeetingLengthTextField() {
  
    const handleMeetingLengthChange = (event) => {
      const newMeetingLength = parseInt(event.target.value);
      if (!isNaN(newMeetingLength)) {
        setMeetingLength(newMeetingLength);
      }
    };
  
    return (
      <TextField
        label="Meeting Length (minutes)"
        type="number"
        value={meetingLength}
        onChange={handleMeetingLengthChange}
        InputProps={{ inputProps: { min: 0 } }}
        fullWidth
        variant="outlined"
      />
    );
  }
  
  
  

  function saveMeeting() {
    setAddedMeetings((prevList) =>
      prevList.map((item) =>
        item.name === selectedMeeting ? { ...item, invitedParticipants: selected, duration: meetingLength} : item
      )
    );
    console.warn(addedMeetings)
    setSelected([]);
    setSelectedMeeting('')
    setSelectedParticipant('')
  }

  return (
    <div className="participant-info">  
        <div className="participant-info__header">
        <FaBuilding className="participant-info__icon" />
        <span className="participant-info__title">Meeting Info</span>
        <MdClose className="participant-info__icon" onClick={() => setSelectedMeeting('')}/>
        </div>
        <div className="participant-info__body">
        <div className="participant-info__row">
            <label className="participant-info__label">Title:</label>
            <input
            type="text"
            value={selectedMeeting}
            onChange={(event) => setSelectedMeeting(event.target.value)}
            className="participant-info__input"
            />
        </div>
        <div>
        {addedParticipants.map((item, index) => (
            <div
            key={index}
            onClick={() => handleItemClick(item)}
            style={{
                backgroundColor: selected.includes(item.name) ? '#90EE90' : 'white',
                padding: '10px',
                border: '1px solid black',
                margin: '5px',
                cursor: 'pointer',
            }}
            >
            {item.name}
            </div>
        ))}
        </div>
        <div style={{marginTop: 20}}>
          {props.usingIntervals && 
            <MeetingLengthTextField />
          }
        </div>
        <div className="participant-info__actions">
            <button onClick={saveMeeting} className="participant-info__button">Save</button>
            <button onClick={() => [setSelectedMeeting(''), setSelected([])]} className="participant-info__button">Cancel</button>
        </div>
    </div>
    </div>
  );
}

export default EditMeeting;