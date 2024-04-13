import React from 'react';
import { Link } from 'react-router-dom';

function MovieListHeader() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="movies">Movies</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link to="movies">Categories</Link>
        </li>
      </ul>
    </nav>
  );
}

export default MovieListHeader;
