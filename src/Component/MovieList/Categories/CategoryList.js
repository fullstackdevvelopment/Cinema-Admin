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
      <div className="admin__movie__section__content__cat__list">
        <input type="text" value="Arthouse" readOnly />
        <input type="text" value="Arthouse" readOnly />
        <input type="text" value="Arthouse" readOnly />
        <input type="text" value="Biography" readOnly />
        <input type="text" value="Biography" readOnly />
        <input type="text" value="Biography" readOnly />
        <input type="text" value="Western" readOnly />
        <input type="text" value="Western" readOnly />
        <input type="text" value="Western" readOnly />
        <input type="text" value="Military detectives" readOnly />
        <input type="text" value="Military detectives" readOnly />
        <input type="text" value="Military detectives" readOnly />
        <input type="text" value="Documentaries" readOnly />
        <input type="text" value="Documentaries" readOnly />
        <input type="text" value="Documentaries" readOnly />
        <input type="text" value="Comedy" readOnly />
        <input type="text" value="Comedy" readOnly />
        <input type="text" value="Comedy" readOnly />
        <input type="text" value="For children" readOnly />
        <input type="text" value="For children" readOnly />
        <input type="text" value="For children" readOnly />
        <input type="text" value="Drama" readOnly />
        <input type="text" value="Drama" readOnly />
        <input type="text" value="Drama" readOnly />
        <input type="text" value="Family" readOnly />
        <input type="text" value="Family" readOnly />
        <input type="text" value="Family" readOnly />
        <input type="text" value="Fantastic Fantasy" readOnly />
        <input type="text" value="Fantastic Fantasy" readOnly />
        <input type="text" value="Fantastic Fantasy" readOnly />
      </div>
    </div>
  );
}

export default CategoryList;
