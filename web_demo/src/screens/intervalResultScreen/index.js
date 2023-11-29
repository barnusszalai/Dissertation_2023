import styled from '@emotion/styled';
import { GlobalContext } from '../../GlobalContext';
import React, { useEffect, useState, useContext } from 'react';
import axios from "axios";

// const jsonData = [
//   {
//     name: 'Alice',
//     meetings: [
//       {id: 'M6', start: 13.7, end: 14.25, color: '#b199ca', day: 1},
//       {id: 'M5', start: 9.25, end: 12, color: '#9596cb', day: 2},
//       {id: 'M2', start: 10.4, end: 12.4, color: '#f5c6b7', day: 1},
//       {id: 'M1', start: 11.5, end: 13, color: '#9ce3f3', day: 3}
//     ],
//   },
//   {
//     name: 'Bob',
//     meetings: [
//       { id: 'M1', start: 11.5, end: 13, color: '#9ce3f3', day: 3},
//       { id: 'M3', start: 11, end: 14, color: '#ffcc80', day: 1},
//       { id: 'M5', start: 9.25, end: 12, color: '#9596cb', day: 2},
//     ],
//   },
// ];

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  margin: 0 auto;
`;

const Participant = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

const Name = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
`;

const CalendarRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const Cell = styled.div`
  flex-grow: 1;
  flex-basis: 0;
  padding: 8px;
  border: 1px solid #eee;
  position: relative;
  min-height: 48px;
`;

const TimeLabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 4px;
  justify-content: space-between; // Add this line to fix alignment
`;

const TimeLabel = styled.div`
  font-size: 12px;
  color: #999;
  margin-right: -6%;
`;

const MeetingBlock = styled.div`
  position: absolute;
  top: 0;
  left: ${({ left }) => left * 100}%;
  width: ${({ width }) => width * 100}%;
  height: 100%;
  background-color: ${({ color }) => color};
  color: ${({ color }) => getContrastText(color)};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DaySwitcher = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
`;

const DayButton = styled.button`
  background-color: ${({ selected }) => (selected ? '#f28482' : 'transparent')};
  color: ${({ selected }) => (selected ? '#000' : '#000')};
  padding: 8px 16px;
  border: 2px solid #555;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 8px;
  font-size: 14px;
  font-weight: bold;
  transition: background-color 0.3s, color 0.3s;
  &:hover {
    background-color: ${({ selected }) => (selected ? '#f28482' : '#f28482')};
  }
  &:last-child {
    margin-right: 0;
  }
`;
const UnavailableBlock = styled(MeetingBlock)`
  background-color: #f44336;
  color: ${({ color }) => getContrastText('#f44336')};
`;


const getContrastText = (bgColor) => {
  const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(bgColor);

  if (!rgb) {
    return '#000';
  }

  const r = parseInt(rgb[1], 16);
  const g = parseInt(rgb[2], 16);
  const b = parseInt(rgb[3], 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#000' : '#fff';
};

const IntervalResult = () => {


  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedParticipant, setSelectedParticipant, addedParticipants, setAddedParticipants, selectedMeeting, setSelectedMeeting, addedMeetings, setAddedMeetings] = useContext(GlobalContext);

  const [jsonData, setjsonData] = useState([])

    // useEffect(() => {
    //     axios
    //     .get("http://localhost:8000/testapi/meetingrequest/")
    //     .then((res) => [console.warn(res.data.data), console.warn(res.data.data), setjsonData(res.data.data.result)])
    //     .catch((err) => console.log(err));
    // }, [])

    const dataToPassApi = {participants: addedParticipants, meetings: addedMeetings}
    console.warn(dataToPassApi)
    useEffect(() => {
        axios
        .put("http://prj-backend.herokuapp.com/testapi/meetingrequest/", dataToPassApi)
        .then((res) => [console.warn(res.data.data), setjsonData(res.data.data.result)])
        .catch((err) => console.log(err));
    }, [])

    
    const unavailableBlocks = [
      {
        participantId: 'Bob',
        blocks: [
          { day: 1, start: '10:00', end: '10:30' },
        ],
      },
    ];

    const timeToDecimal = (time) => {
      const [hour, minute] = time.split(':');
      return parseInt(hour, 10) + parseInt(minute, 10) / 60;
    };
        


  const renderTimeLabels = (meetings) => {
    const times = [];
    for (let i = 8; i <= 18; i++) {
      if(i<10) {
        times.push(`0${i}:00`);
      } else {
        times.push(`${i}:00`);
      }
      if (i !== 18) {
        times.push(`${i}:30`);
      }
    }

    const timeLabels = times.map((time, index) => (
      <TimeLabel key={index}>
        {time}
      </TimeLabel>
    ));

    // Add an empty TimeLabel at the end to align the last label correctly
    timeLabels.push(<TimeLabel key="last"></TimeLabel>);

    return (
      <TimeLabelWrapper>
        {timeLabels}
      </TimeLabelWrapper>
    );
  };

  const renderDayButtons = () => {
    const days = Array.from({ length: 5 }, (_, i) => i + 1);
    return days.map((day) => (
      <DayButton
        key={day}
        selected={day === selectedDay}
        onClick={() => setSelectedDay(day)}
      >
        Day {day}
      </DayButton>
    ));
  };

  const renderParticipant = (participant) => {
    const filteredMeetings = participant.meetings.filter(
      (meeting) => meeting.day === selectedDay
    );
    return (
      <Participant key={participant.name}>
        <Name>{participant.name}</Name>
        {renderTimeLabels(filteredMeetings)}
        {renderCalendar(filteredMeetings, participant.name)}
      </Participant>
    );
  };


  const renderCalendar = (meetings, participantId) => {
    const hours = Array.from({ length: 18 - 8 }, (_, i) => i + 8);
    const cells = hours.map((hour) => {
      const offset = (1 - 1) * (18 - 8);
      const overlappingMeetings = meetings.filter(
        (m) => (m.start - offset) < hour + 1 && (m.end - offset) > hour
      );
  
      // Find the unavailable blocks for the current participant
      const participantUnavailableBlocks = addedParticipants.find(
        (item) => item.name === participantId
      )?.unavailableSlots;
  
      const meetingBlocks = overlappingMeetings.map((meeting, index) => {
        const start = Math.max(meeting.start - offset, hour);
        const end = Math.min(meeting.end - offset, hour + 1);
        const left = start - hour;
        const width = end - start;
  
        const allOverlappingMeetings = meetings.filter(
          (m) => m.start < meeting.end && m.end > meeting.start
        );
  
        const overlappingIndex = allOverlappingMeetings.findIndex(
          (m) => m.id === meeting.id
        );
  
        const top = overlappingIndex * (100 / allOverlappingMeetings.length);
  
        const isOverlap =
          participantUnavailableBlocks &&
          participantUnavailableBlocks.some(
            (block) =>
              block.day === selectedDay &&
              timeToDecimal(block.startTime) < meeting.endTime &&
              timeToDecimal(block.endTime) > meeting.startTime
          );
  
        return (
          <MeetingBlock
            key={meeting.id}
            left={left}
            width={width}
            color={meeting.color}
            style={{
              top: `${top}%`,
              height: isOverlap ? '50%' : `${100 / allOverlappingMeetings.length}%`,
            }}
          >
            {meeting.id}
          </MeetingBlock>
        );
      });
  
      const unavailableMeetingBlocks = [];
  
      if (participantUnavailableBlocks) {
        participantUnavailableBlocks.forEach((block) => {
          const startDecimal = timeToDecimal(block.startTime);
          const endDecimal = timeToDecimal(block.endTime);
  
          if (hour === startDecimal && selectedDay === block.day) {
            const left = 0;
            const width = endDecimal - startDecimal;
  
            const overlapping = overlappingMeetings.some(
              (m) => m.start < endDecimal && m.end > startDecimal
            );
  
            const unavailableBlock = (
              <UnavailableBlock
                key={`unavailable-${hour}`}
                left={left}
                width={width}
                color="#f44336"
                style={{
                  height: overlapping ? '50%' : '100%',
                  top: overlapping ? '50%' : '0',
                }}
              >
                X
              </UnavailableBlock>
            );
            unavailableMeetingBlocks.push(unavailableBlock);
          }
        });
      }
  
      return (
        <Cell key={hour}>
          {meetingBlocks}
          {unavailableMeetingBlocks}
        </Cell>
      );
    });
  
    return <CalendarRow>{cells}</CalendarRow>;
  };
  

  

  return (
    <Wrapper>
      <DaySwitcher>{renderDayButtons()}</DaySwitcher>
      {jsonData.map(renderParticipant)}
    </Wrapper>
  );
};

export default IntervalResult;

