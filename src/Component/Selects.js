import React from 'react';
import Select from 'react-select';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const options = [
  {
    value: 'chocolate',
    label: 'Chocolate',
  },
  {
    value: 'strawberry',
    label: 'Strawberry',
  },
  {
    value: 'vanilla',
    label: 'Vanilla',
  },
];

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
    boxShadow: '0px 0px 28px 5px rgba(19,95,85,0.85)',
    border: 'none',
    outline: 'none',
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '0',
    margin: '2px',
  }),
};

function Selects() {
  return (
    <div className="admin__select">
      <Select
        options={options}
        styles={customStyles}
        placeholder="Start Date"
      />
      <span className="admin__select__icon">
        <FontAwesomeIcon icon={faMinus} />
      </span>
      <Select
        options={options}
        styles={customStyles}
        placeholder="End Date"
      />
    </div>
  );
}

export default Selects;
