import React, { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import errorImg from '../../../assets/images/error.png';
import { deleteMovie } from '../../../store/actions/deleteMovie';

function Card(props) {
  const { src, title, movieId } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEdit = useCallback(() => {
    navigate(`/movie/single/edit/${movieId}`);
  }, [navigate, movieId]);

  const handleDeleteMovie = useCallback(async () => {
    const confirmed = window.confirm('Are you sure you want to delete this movie?');
    if (confirmed) {
      try {
        await dispatch(deleteMovie(movieId));
      } catch (error) {
        console.error('Failed to delete movie:', error);
      }
    }
  }, [dispatch, movieId]);

  return (
    <article key={movieId} className="card">
      <figure>
        <img
          src={`http://localhost:4000/${src}`}
          alt="Film"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = errorImg;
          }}
        />
        <figcaption>
          <h2>{title}</h2>
          <FontAwesomeIcon icon={faPen} onClick={handleEdit} />
          <FontAwesomeIcon icon={faTrash} onClick={handleDeleteMovie} />
        </figcaption>
      </figure>
    </article>
  );
}

Card.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  movieId: PropTypes.number.isRequired,
};

export default Card;
