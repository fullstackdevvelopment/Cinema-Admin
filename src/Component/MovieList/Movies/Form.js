import React from 'react';
import ReactStars from 'react-rating-stars-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as DownloadIcon } from '../../../assets/icons/download.svg';

function Form() {
  const secondExample = {
    size: 30,
    count: 5,
    a11y: true,
    isHalf: true,
    color: 'white',
    activeColor: 'orange',
  };
  return (
    <form className="admin__movie__section__content__form">
      <div className="admin__movie__section__content__form__first">
        <div className="admin__movie__section__content__form__first__input">
          <input id="file" type="file" accept="image/*" />
          <label htmlFor="file">
            Photo
            <DownloadIcon />
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
      <div className="admin__movie__section__content__form__actors">
        <div className="admin__movie__section__content__form__actors__title">
          <h2>Actors Name & Photo</h2>
        </div>
        <div className="admin__movie__section__content__form__actors__input">
          <div className="admin__movie__section__content__form__actors__input__block">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="actor1">
              <DownloadIcon />
            </label>
            <input id="actor1" type="file" accept="image/*" />
            <input type="text" placeholder="Full Name" />
          </div>
          <div className="admin__movie__section__content__form__actors__input__block">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="actor1">
              <DownloadIcon />
            </label>
            <input id="actor1" type="file" accept="image/*" />
            <input type="text" placeholder="Full Name" />
          </div>
          <div className="admin__movie__section__content__form__actors__input__block">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="actor1">
              <DownloadIcon />
            </label>
            <input id="actor1" type="file" accept="image/*" />
            <input type="text" placeholder="Full Name" />
          </div>
          <div className="admin__movie__section__content__form__actors__input__block">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="actor1">
              <DownloadIcon />
            </label>
            <input id="actor1" type="file" accept="image/*" />
            <input type="text" placeholder="Full Name" />
          </div>
          <div className="admin__movie__section__content__form__actors__input__block">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="actor1">
              <DownloadIcon />
            </label>
            <input id="actor1" type="file" accept="image/*" />
            <input type="text" placeholder="Full Name" />
          </div>
          <div className="admin__movie__section__content__form__actors__input__block">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="actor1">
              <DownloadIcon />
            </label>
            <input id="actor1" type="file" accept="image/*" />
            <input type="text" placeholder="Full Name" />
          </div>
          <div className="admin__movie__section__content__form__actors__input__btn">
            <p>Add new</p>
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </div>
      </div>
      <div className="admin__movie__section__content__form__detalis">
        <div className="admin__movie__section__content__form__detalis__title">5</div>
        <div className="admin__movie__section__content__form__detalis__block">
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <input type="text" />
        </div>
      </div>
    </form>
  );
}

export default Form;
