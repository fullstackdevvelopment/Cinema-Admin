import React, { useCallback, useMemo } from 'react';
import Select from 'react-select';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import generateOptions from '../helpers/GenerateOptions';

const customStyles = {
  control: (provided) => ({
    ...provided,
    background: 'rgba(255, 255, 255, 0.7)',
    borderRadius: '20px',
    border: '2px solid rgb(19, 95, 85)',
    padding: '5px 19px',
    color: '#135f55',
    fontSize: '16px',
    width: '182px',
    height: '50px',
    fontWeight: '600',
    lineHeight: '21.09px',
    '&:focus': {
      ...provided[':focus'],
      color: '#fff',
      border: 'none',
      outline: 'none',
      boxShadow: 'none',
    },
    '&:hover': {
      ...provided[':hover'],
      outline: 'none',
      boxShadow: 'none',
    },
    '&:focus-visible': {
      ...provided[':focus-visible'],
      outline: 'none',
      boxShadow: 'none',
    },
  }),
  option: (provided) => ({
    ...provided,
    background: '#135f55',
    color: '#fff',
    border: 'none',
    outline: 'none',
    boxShadow: 'none',
    borderRadius: '15px',
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: '21.09px',
    width: '100%',
    ':hover': {
      background: 'rgba(255, 255, 255, 0.7)',
      color: '#135f55',
      border: 'none',
      outline: 'none',
      boxShadow: 'none',
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#135f55',
    border: 'none',
    outline: 'none',
    boxShadow: 'none',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#135f55',
    margin: '0',
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: '21.09px',
    border: 'none',
    outline: 'none',
    boxShadow: 'none',
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    width: '0',
    border: 'none',
    outline: 'none',
    boxShadow: 'none',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: '#135f55 !important',
    border: 'none',
    outline: 'none',
    boxShadow: 'none',
  }),
  menu: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? 'rgba(255, 255, 255, 0.7)' : 'rgba(19, 95, 85, 1)',
    borderRadius: '15px',
    boxShadow: '0px 0px 28px 5px rgba(19, 95, 85, 0.85)',
    border: 'none',
    outline: 'none',
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '0',
    margin: '2px',
  }),
  menuList: (base) => ({
    ...base,
    '::-webkit-scrollbar': {
      width: '20px',
      height: '0px',
    },
    '::-webkit-scrollbar-track': {
      background: '#135f55',
      borderTopRightRadius: '15px',
      borderBottomRightRadius: '15px',
    },
    '::-webkit-scrollbar-thumb': {
      background: '#fff',
      borderRadius: '20px',
      transition: 'all 0.3s',
    },
    '::-webkit-scrollbar-thumb:hover': {
      background: '#0c8575',
    },
  }),
  clearIndicator: (provided) => ({
    ...provided,
    color: '#062822 !important',
    border: 'none',
    outline: 'none',
    boxShadow: 'none',
    padding: '0',
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: '0',
  }),
  input: (provided) => ({
    ...provided,
    color: '#062822 !important',
  }),
};

function Selects(props) {
  const { setStartDate, setEndDate } = props;

  const options = useMemo(() => generateOptions({ startDate: '2024-08-01', endDate: '2024-09-01' }), []);

  const startDateOptions = [{ value: 'Start Date', label: 'Start Date' }, ...options];
  const endDateOptions = [{ value: 'End Date', label: 'End Date' }, ...options];

  const handleStartDateChange = useCallback((selectedOption) => {
    setStartDate(selectedOption ? selectedOption.value : '');
  }, [setStartDate]);

  const handleEndDateChange = useCallback((selectedOption) => {
    setEndDate(selectedOption ? selectedOption.value : '');
  }, [setEndDate]);

  return (
    <div className="admin__select">
      <Select
        options={startDateOptions}
        styles={customStyles}
        placeholder="Start Date"
        onChange={handleStartDateChange}
        isClearable
      />
      <span className="admin__select__icon">
        <FontAwesomeIcon icon={faMinus} />
      </span>
      <Select
        options={endDateOptions}
        styles={customStyles}
        placeholder="End Date"
        onChange={handleEndDateChange}
        isClearable
      />
    </div>
  );
}

Selects.propTypes = {
  setStartDate: PropTypes.func.isRequired,
  setEndDate: PropTypes.func.isRequired,
};

export default Selects;
