import React from 'react';
import AccordionDetails from '@mui/material/AccordionDetails';

function AccordionMovies(props) {
  const { filmPhoto, title } = props;
  return (
    <AccordionDetails className="user__card__content__list">
      <div className="user__card__content__photos__list">
        <div className="user__card__content__photos__film__block">
          <img src={`http://localhost:4000/${filmPhoto}`} alt="photoFilm" />
          <h3>{title}</h3>
        </div>
      </div>
    </AccordionDetails>
  );
}

export default AccordionMovies;
