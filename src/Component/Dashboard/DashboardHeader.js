import React from 'react';
import { NavLink } from 'react-router-dom';
import Selects from '../Selects';

function DashboardHeader() {
  return (
    <div className="movies__nav__dashboard__banner">
      <nav className="movies__nav__dashboard__header">
        <NavLink to="/dashboard/all" className="movies__nav__dashboard__item">
          All
        </NavLink>
        <NavLink to="/dashboard/tickets" className="movies__nav__dashboard__item">
          Tickets
        </NavLink>
      </nav>
      <div className="movies__nav__dashboard__header__select">
        <div className="movies__nav__dashboard__select__item">
          <Selects />
        </div>
        <div className="movies__nav__dashboard__select__item">
          <Selects />
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
