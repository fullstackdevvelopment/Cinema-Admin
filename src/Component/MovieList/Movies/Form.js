import React from 'react';
import ReactStars from 'react-rating-stars-component';
// eslint-disable-next-line import/no-extraneous-dependencies
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import downloadIcon from '../../../assets/icons/download.svg';

function Form() {
  const secondExample = {
    size: 24,
    count: 5,
    a11y: true,
    isHalf: true,
    color: 'white',
    activeColor: 'orange',
    emptyIcon: <FontAwesomeIcon icon={farStar} />,
    halfIcon: <FontAwesomeIcon icon={farStar} />,
    filledIcon: <FontAwesomeIcon icon={farStar} />,
  };
  return (
    <form className="admin__movie__section__content__form">
      <div className="admin__movie__section__content__form__first">
        <div className="admin__movie__section__content__form__first__input">
          <input id="file" type="file" accept="image/*" />
          <label htmlFor="file">
            Photo
            <img src={downloadIcon} alt="Download Icon" />
          </label>
          <input type="text" placeholder="Film Name" />
          <input type="text" placeholder="Hour" />
        </div>
        <div className="admin__movie__section__content__form__first__textarea">
          <textarea placeholder="Description" />
        </div>
      </div>
      <div className="admin__movie__section__content__form__rating">
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <ReactStars {...secondExample} />
      </div>
    </form>
  );
}

export default Form;
