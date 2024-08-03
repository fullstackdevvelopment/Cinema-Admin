import React, { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import Card from './Card';
import { movieLIst } from '../../../store/actions/movieList';
import Pagination from '../../../helpers/Pagination';
import Selects from '../../Selects';

function MovieList(props) {
  const { setFilteredMovieCount } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const list = useSelector((state) => state.movieList.list);
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    dispatch(movieLIst({ page: currentPage, limit: 6 }));
  }, [dispatch, currentPage]);

  const handleCreate = useCallback(() => {
    navigate('/movie/create');
  }, [navigate]);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, [setCurrentPage]);

  const filterMovieByDate = useCallback(() => {
    if (!list) return [];
    if (!startDate || !endDate) return list;
    return list.filter((movie) => {
      const movieDate = moment(movie.createdAt).format('YYYY-MM-DD');
      return movieDate >= startDate && movieDate <= endDate;
    });
  }, [list, startDate, endDate]);

  const filteredMovies = filterMovieByDate();
  const totalPages = Math.ceil(filteredMovies.length / 6);
  const startIndex = (currentPage - 1) * 6;
  const endIndex = startIndex + 6;
  const paginatedMovie = filteredMovies.slice(startIndex, endIndex);
  const paginatedMovieCount = filteredMovies.length;

  useEffect(() => {
    if (paginatedMovie && paginatedMovie.length > 0) {
      setFilteredMovieCount(paginatedMovieCount.toString());
    } else {
      setFilteredMovieCount(0);
    }
  }, [paginatedMovie, paginatedMovieCount]);

  return (
    <div className="admin__movie__section__content__list">
      <div className="admin__movie__section__content__list__select">
        <div className="movies__nav__dashboard__select__item">
          <Selects setStartDate={setStartDate} setEndDate={setEndDate} />
        </div>
      </div>
      <div className="admin__movie__section__content__list__create">
        <FontAwesomeIcon icon={faPlus} onClick={handleCreate} />
      </div>
      <div className="admin__movie__section__content__list__block">
        {paginatedMovie ? paginatedMovie.map((l) => (
          <Card
            key={l.id}
            movieId={l.id}
            title={l.title}
            src={l.photos[0]?.moviePhoto}
          />
        )) : null}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

MovieList.propTypes = {
  setFilteredMovieCount: PropTypes.func.isRequired,
};

export default MovieList;
