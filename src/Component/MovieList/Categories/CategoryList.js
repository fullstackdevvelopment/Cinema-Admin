import React from 'react';
import { faCheck, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function CategoryList() {
  return (
    <div className="admin__movie__section__content__cat">
      <div className="admin__movie__section__content__cat__first">
        <div className="admin__movie__section__content__cat__first__input">
          <input type="text" placeholder="Name" />
          <FontAwesomeIcon icon={faCheck} />
        </div>
        <div className="admin__movie__section__content__cat__first__icon">
          <FontAwesomeIcon icon={faPen} />
          <FontAwesomeIcon icon={faPlus} />
        </div>
      </div>
    </div>
  );
}

export default CategoryList;
