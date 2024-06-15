import React from 'react';
import { NavLink } from 'react-router-dom';

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
    </nav>
  );
}

export default MovieListHeader;
