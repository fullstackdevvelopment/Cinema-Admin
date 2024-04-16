import React, { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Card from './Card';

function MovieList() {
  const navigate = useNavigate();
  const handleCreate = useCallback(() => {
    navigate('/movie/create');
  }, []);
  return (
    <div className="admin__movie__section__content__list">
      <div className="admin__movie__section__content__list__create">
        <FontAwesomeIcon icon={faPlus} onClick={handleCreate} />
      </div>
      <div className="admin__movie__section__content__list__block">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}

export default MovieList;
