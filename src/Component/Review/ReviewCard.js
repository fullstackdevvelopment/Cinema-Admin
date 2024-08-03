import React, { useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import moment from 'moment';
import PropTypes from 'prop-types';
import { ReactComponent as CheckIcon } from '../../assets/icons/check.svg';
import errorUser from '../../assets/images/userError.webp';

function ReviewCard(props) {
  const {
    id, commentText, createdAt,
    photo, firstName, lastName,
    rating,
    selectedReviews,
    setSelectedReviews,
    moviePhoto,
  } = props;

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      setSelectedReviews([...selectedReviews, id.toString()]);
    } else {
      setSelectedReviews(selectedReviews.filter((reviewId) => reviewId !== id.toString()));
    }
  };

  return (
    <article className={`review__card ${isChecked ? 'checked' : ''}`}>
      <div className="checkbox__container">
        <input id={id} type="checkbox" onChange={handleCheckboxChange} checked={isChecked} />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor={id} className="checkbox__label">
          <CheckIcon className="check__icon" />
        </label>
      </div>
      <div className="review__card__content">
        <figure>
          <img
            src={`http://localhost:4000/${photo}`}
            alt={`User ${id}`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = errorUser;
            }}
          />
        </figure>
        <p>
          {firstName}
          {' '}
          {lastName}
        </p>
        <p>
          {moment(createdAt)
            .format('YYYY.MM.DD')}
        </p>
        <img
          className="review__card__content__image"
          src={`http://localhost:4000/${moviePhoto}`}
          alt="moviePhoto"
        />
        <figcaption>
          <p>
            {commentText}
          </p>
        </figcaption>
        <ReactStars
          style={{ position: 'absolute' }}
          classNames="review__stars"
          size={30}
          count={5}
          isHalf
          value={rating}
          edit={false}
          color="white"
          activeColor="orange"
        />
      </div>
    </article>
  );
}

ReviewCard.propTypes = {
  id: PropTypes.number.isRequired,
  commentText: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  selectedReviews: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedReviews: PropTypes.func.isRequired,
};

export default ReviewCard;
