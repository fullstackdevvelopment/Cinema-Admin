import React from 'react';
import AccordionDetails from '@mui/material/AccordionDetails';
import filmPhoto from '../../assets/images/moviePhoto.png';

function AccordionMovies() {
  return (
    <AccordionDetails className="user__card__content__list">
      <div className="user__card__content__photos__list">
        <div className="user__card__content__photos__film__block">
          <img src={filmPhoto} alt="photoFilm" />
          <h3>1+1</h3>
        </div>
        <div className="user__card__content__photos__film__block">
          <img src={filmPhoto} alt="photoFilm" />
          <h3>1+1</h3>
        </div>
        <div className="user__card__content__photos__film__block">
          <img src={filmPhoto} alt="photoFilm" />
          <h3>1+1</h3>
        </div>
        <div className="user__card__content__photos__film__block">
          <img src={filmPhoto} alt="photoFilm" />
          <h3>1+1</h3>
        </div>
        <div className="user__card__content__photos__film__block">
          <img src={filmPhoto} alt="photoFilm" />
          <h3>1+1</h3>
        </div>
        <div className="user__card__content__photos__film__block">
          <img src={filmPhoto} alt="photoFilm" />
          <h3>1+1</h3>
        </div>
        <div className="user__card__content__photos__film__block">
          <img src={filmPhoto} alt="photoFilm" />
          <h3>1+1</h3>
        </div>
        <div className="user__card__content__photos__film__block">
          <img src={filmPhoto} alt="photoFilm" />
          <h3>1+1</h3>
        </div>
        <div className="user__card__content__photos__film__block">
          <img src={filmPhoto} alt="photoFilm" />
          <h3>1+1</h3>
        </div>
        <div className="user__card__content__photos__film__block">
          <img src={filmPhoto} alt="photoFilm" />
          <h3>1+1</h3>
        </div>
      </div>
    </AccordionDetails>
  );
}

export default AccordionMovies;
