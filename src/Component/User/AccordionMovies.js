import React from 'react';
import AccordionDetails from '@mui/material/AccordionDetails';
import PropTypes from 'prop-types';
import errorImg from '../../assets/images/error.png';

function AccordionMovies(props) {
  const { filmPhoto, title } = props;
  return (
    <AccordionDetails className="user__card__content__list">
      <div className="user__card__content__photos__list">
        <div className="user__card__content__photos__film__block">
          <img
            src={`http://localhost:4000/${filmPhoto}`}
            alt="photoFilm"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = errorImg;
            }}
          />
          <h3>{title}</h3>
        </div>
      </div>
    </AccordionDetails>
  );
}

AccordionMovies.propTypes = {
  filmPhoto: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default AccordionMovies;
