import React from 'react';
import PropTypes from 'prop-types';
import errorUser from '../../assets/images/userError.webp';

function Movies(props) {
  const { filmPhoto, title } = props;
  return (
    <div className="user__card__content__photos__film">
      <div className="user__card__content__photos__film__block">
        <img
          src={`http://localhost:4000/${filmPhoto}`}
          alt="photoFilm"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = errorUser;
          }}
        />
        <h3>{title}</h3>
      </div>
    </div>
  );
}

Movies.propTypes = {
  filmPhoto: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Movies;
