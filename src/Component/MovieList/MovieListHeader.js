import React from 'react';
import { NavLink } from 'react-router-dom';

function MovieListHeader() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/movie/movies">Movies</NavLink>
        </li>
        <li>
          <NavLink to="/movie/categories">Categories</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MovieListHeader;
