import React from 'react';

function Movies(props) {
  const { filmPhoto, title } = props;
  return (
    <div className="user__card__content__photos__film">
      <div className="user__card__content__photos__film__block">
        <img src={`http://localhost:4000/${filmPhoto}`} alt="photoFilm" />
        <h3>{title}</h3>
      </div>
    </div>
  );
}

export default Movies;
