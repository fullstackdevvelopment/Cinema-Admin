import React, { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import errorImg from '../../../assets/images/error.png';

function Card(props) {
  const { src, title, id } = props;
  const navigate = useNavigate();

  const handleEdit = useCallback(() => {
    navigate(`/movie/single/edit/${id}`);
  }, []);

  return (
    <article key={id} className="card">
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
        </figcaption>
      </figure>
    </article>
  );
}

Card.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default Card;
