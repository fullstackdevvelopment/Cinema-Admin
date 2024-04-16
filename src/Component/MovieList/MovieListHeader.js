import React, { useCallback, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Selects from '../Selects';

function MovieListHeader() {
  const [activeHeaderItem, setActiveHeaderItem] = useState('');

  const handleHeaderItemClick = useCallback((menuItem) => {
    setActiveHeaderItem(menuItem);
  }, []);

  return (
    <nav>
      <ul>
        <li>
          <NavLink
            to="/movie/list"
            className={activeHeaderItem === 'Movies' ? 'active' : ''}
            onClick={() => handleHeaderItemClick('Movies')}
          >
            Movies
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/movie/categories"
            className={activeHeaderItem === 'Categories' ? 'active' : ''}
            onClick={() => handleHeaderItemClick('Categories')}
          >
            Categories
          </NavLink>
        </li>
      </ul>
      <Selects />
    </nav>
  );
}

export default MovieListHeader;
