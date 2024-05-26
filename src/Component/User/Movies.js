import React from 'react';
import filmPhoto from '../../assets/images/moviePhoto.png';

function Movies() {
  return (
    <div className="user__card__content__photos__film">
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
  );
}

export default Movies;
