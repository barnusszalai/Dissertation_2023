import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

const DateSelector = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const labelStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    marginRight: '12px',
    width: '250px'
  };

  const datePickerStyle = {
    width: '140px',
    height: '25px',
    fontSize: '18px',
    borderRadius: '8px',
    border: '2px solid #ccc',
    padding: '8px 12px',
  };

  return (
    <div className="date-selector" style={{ display: 'flex', alignItems: 'center' }}>
      <label htmlFor="generate-schedules-by" className="date-selector-label" style={labelStyle}>
        Generate Schedules By
      </label>
      <DatePicker
        id="generate-schedules-by"
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy/MM/dd"
        className="date-selector-input"
        popperPlacement="bottom-start"
        popperModifiers={{
          offset: {
            enabled: true,
            offset: '5px, 10px',
          },
          preventOverflow: {
            enabled: true,
            escapeWithReference: false,
            boundariesElement: 'viewport',
          },
        }}
        customInput={<input style={datePickerStyle} />}
      />
    </div>
  );
};

export default DateSelector;
