import React from 'react';
import '../../css/calendar.css'

const hours = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00'];

const colorCodes = ["#cdb4db", "#ffc8dd", "#bde0fe", "#e9edc9", "#dda15e", "#ca6702", "#8d99ae", 'purple', 'green', 'blue', 'pink']

const Calendar = (props) => {

    const meetingColors = {}
    const meetings = (typeof props.meetings === 'object' && props.meetings !== null && !Array.isArray(props.meetings)) ? props.meetings : {};
    const allMeetings = Array.isArray(props.allMeetings) ? props.allMeetings : [];
    const index = 0;
    for (let i = 0; i < allMeetings.length; i++) {
        meetingColors[allMeetings[i]] = colorCodes[i];
    }

    function HourBlockDivide({ topColor, bottomColor, topText, bottomText }) {
      return (
        <div className="hour-block" style={{ position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '50%',
              backgroundColor: topColor,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {topText}
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '50%',
              backgroundColor: bottomColor,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {bottomText}
          </div>
        </div>
      );
    }

  return (
    <div className="calendar-container">
      <div className="participant-name">{props.participantName}</div>
      <div className="calendar">
        {hours.map(hour => (
          <div>
            {(typeof meetings[hour] === 'undefined' || meetings[hour].length < 2) ? (
              <div class="hour-block" key={hour} style={{backgroundColor: meetingColors[meetings[hour]]}}>
                {props.participantName === "" ? hour : meetings[hour]}
              </div>
            ) : (
              <HourBlockDivide 
                topColor={meetingColors[meetings[hour][0]]} 
                bottomColor={meetingColors[meetings[hour][1]]} 
                topText={meetings[hour][0]}
                bottomText={meetings[hour][1]}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;