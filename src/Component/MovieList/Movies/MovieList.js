import React, { useCallback, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Card from './Card';
import { movieLIst } from '../../../store/actions/movieList';

function MovieList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const list = useSelector((state) => state.movieList.list);

  useEffect(() => {
    dispatch(movieLIst());
  }, [dispatch]);

  const handleCreate = useCallback(() => {
    navigate('/movie/create');
  }, [navigate]);

  return (
    <div className="admin__movie__section__content__list">
      <div className="admin__movie__section__content__list__create">
        <FontAwesomeIcon icon={faPlus} onClick={handleCreate} />
      </div>
      <div className="admin__movie__section__content__list__block">
        {list && list.map((l) => (
          <Card key={l.id} id={l.id} title={l.title} src={l.photos[0].moviePhoto} />
        ))}
      </div>
    </div>
  );
}

export default MovieList;
