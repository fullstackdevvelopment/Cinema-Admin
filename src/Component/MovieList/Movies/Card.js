import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import filmPhoto from '../../../assets/images/1+1.png';

function Card() {
  return (
    <article className="card">
      <figure>
        <img src={filmPhoto} alt="Film" />
        <figcaption>
          <h2>1+1</h2>
          <FontAwesomeIcon icon={faPen} />
        </figcaption>
      </figure>
    </article>
  );
}

export default Card;
