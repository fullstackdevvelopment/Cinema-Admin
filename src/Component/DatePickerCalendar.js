import React from 'react';
import DatePicker from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

function DatePickerCalendar(props) {
  const {
    startDate, endDate, setStartDate, setEndDate,
  } = props;

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };
  return (
    <div className="calendar">
      <DatePicker
        selected={startDate}
        onChange={(date) => handleStartDateChange(date)}
        placeholderText="Select Date"
        dateFormat="yyyy-MM-dd"
      />
      <span className="calendar__span">
        <FontAwesomeIcon icon={faMinus} />
      </span>
      <DatePicker
        selected={endDate}
        onChange={(date) => handleEndDateChange(date)}
        placeholderText="Select Date"
        dateFormat="yyyy-MM-dd"
      />
    </div>
  );
}

export default DatePickerCalendar;
