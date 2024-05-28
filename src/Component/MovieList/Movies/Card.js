import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

function Card(props) {
  const { src, title, id } = props;
  return (
    <article key={id} className="card">
      <figure>
        <img src={`http://localhost:4000/${src}`} alt="Film" />
        <figcaption>
          <h2>{title}</h2>
          <FontAwesomeIcon icon={faPen} />
        </figcaption>
      </figure>
    </article>
  );
}

export default Card;
