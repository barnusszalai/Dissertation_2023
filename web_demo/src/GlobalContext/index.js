import React, { createContext, useState } from 'react';

export const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
  const [selectedParticipant, setSelectedParticipant] = useState('');
  const [selectedMeeting, setSelectedMeeting] = useState('');
  const [addedParticipants, setAddedParticipants] = useState([]);
  const [addedMeetings, setAddedMeetings] = useState([]);

  return (
    <GlobalContext.Provider value={[selectedParticipant, setSelectedParticipant, addedParticipants, setAddedParticipants, selectedMeeting, setSelectedMeeting, addedMeetings, setAddedMeetings]}>
      {children}
    </GlobalContext.Provider>
  );
};
