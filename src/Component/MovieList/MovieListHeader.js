import React from 'react';
import { NavLink } from 'react-router-dom';
import Selects from '../Selects';

function MovieListHeader() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink
            to="/movie/list"
            className="active"
          >
            Movies
          </NavLink>
        </li>
      </ul>
      <Selects />
    </nav>
  );
}

export default MovieListHeader;
