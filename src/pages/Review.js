import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Component/Header';
import ReviewHeader from '../Component/Review/ReviewHeader';
import ReviewCard from '../Component/Review/ReviewCard';
import Wrapper from '../Component/commons/Wrapper';

function Review() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/signIn');
    }
  }, [token]);
  return (
    <Wrapper>
      <div className="review__page">
        <div className="container">
          <div className="review__page__container">
            <Header />
            <section className="review__page__section">
              <div className="review__page__section__title">
                <h2>Review List</h2>
                <p>1500 Tickets</p>
              </div>
              <div className="review__page__section__nav">
                <ReviewHeader />
              </div>
              <div className="review__page__section__content">
                <div className="review__page__section__content__header">
                  <div className="review__page__section__content__header__block">
                    <div>
                      <p>Photo</p>
                      <p>Full Name</p>
                      <p>Date</p>
                      <p>Review</p>
                    </div>
                  </div>
                  <ReviewCard id={1} />
                  <ReviewCard id={2} />
                  <ReviewCard id={3} />
                  <ReviewCard id={4} />
                </div>
              </div>
              <div className="review__page__section__btn">
                <button type="submit">Delete</button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Review;
