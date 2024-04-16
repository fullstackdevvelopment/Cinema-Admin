import React from 'react';
import ReactStars from 'react-rating-stars-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus, faStar, faStarHalf, faStarHalfStroke,
} from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as DownloadIcon } from '../../../assets/icons/download.svg';

function Form() {
  // const secondExample = {
  //   size: 30,
  //   count: 5,
  //   a11y: true,
  //   isHalf: true,
  //   color: 'white',
  //   activeColor: 'orange',
  // };
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
        <ReactStars
          size={30}
          count={5}
          isHalf
          color="white"
          activeColor="orange"
          emptyIcon={<FontAwesomeIcon icon={faStarHalfStroke} />}
          halfIcon={<FontAwesomeIcon icon={faStarHalf} />}
          fullIcon={<FontAwesomeIcon icon={faStar} />}
        />
      </div>
      <div className="admin__movie__section__content__form__second">
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
          <div className="admin__movie__section__content__form__detalis__title">
            <h2>Details</h2>
          </div>
          <div className="admin__movie__section__content__form__detalis__block">
            <input type="text" placeholder="Details" />
            <input type="text" placeholder="Language" />
            <input type="text" placeholder="Reliese Date" />
            <input type="text" placeholder="Director" />
          </div>
        </div>
      </div>
    </form>
  );
}

export default Form;
