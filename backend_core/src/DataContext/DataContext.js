import React from 'react';
import { useState } from 'react';

export const DataContext = React.createContext();

export const DataProvider = ({ children }) => {
    const [meetingRequest, setMeetingRequest] = useState('');
    const [currentUser, setCurrentUser] = useState('');
  
    const updateMeeting = (newData) => {
      setMeetingRequest(newData);
    };

    const updateUser = (newData) => {
      setCurrentUser(newData);
    };
  
    return (
      <DataContext.Provider value={{ meetingRequest, updateMeeting, currentUser, updateUser }}>
        {children}
      </DataContext.Provider>
    );
};