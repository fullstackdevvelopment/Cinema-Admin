import React, { useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import photo1 from '../../assets/images/photo1.jpg';
import { ReactComponent as CheckIcon } from '../../assets/icons/check.svg';

function ReviewCard(props) {
  const { id } = props;
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <article className={`review__card ${isChecked ? 'checked' : ''}`}>
      <div className="checkbox__container">
        <input id={id} type="checkbox" onChange={handleCheckboxChange} />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor={id} className="checkbox__label" />
        <CheckIcon className="check__icon" />
      </div>
      <div className="review__card__content">
        <figure>
          <img src={photo1} alt="photo1" />
        </figure>
        <p>Jon Nick</p>
        <p>10.05.2019</p>
        <figcaption>
          <ReactStars
            size={30}
            count={5}
            isHalf
            color="white"
            activeColor="orange"
          />
          <p>
            This is the best movie I have ever seen. I have watched it for the hundredth time, but
            every time its like the first. In the end, it grows to tears, no matter how many
            times
          </p>
        </figcaption>
      </div>
    </article>
  );
}

export default ReviewCard;
