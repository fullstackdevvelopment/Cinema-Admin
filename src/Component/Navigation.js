import React from 'react';
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="movies__nav">
      <NavLink to="/dashboard" className="movies__nav__item">
        DASHBOARD
      </NavLink>
      <NavLink to="/movie" className="movies__nav__item">
        MOVIE LIST
      </NavLink>
      <NavLink to="/user" className="movies__nav__item">
        USER LIST
      </NavLink>
      <NavLink to="/review" className="movies__nav__item">
        REVIEW LIST
      </NavLink>
    </nav>
  );
}

export default Navigation;
