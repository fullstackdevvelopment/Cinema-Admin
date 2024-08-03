import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RingLoader } from 'react-spinners';
import moment from 'moment';
import Header from '../Component/Header';
import ReviewCard from '../Component/Review/ReviewCard';
import Wrapper from '../Component/commons/Wrapper';
import { reviewList } from '../store/actions/reviewList';
import { deleteReview } from '../store/actions/deleteReview';
import Pagination from '../helpers/Pagination';
import Selects from '../Component/Selects';

function Review() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { pathname } = location;
  const list = useSelector((state) => state.reviewList.list);
  const token = sessionStorage.getItem('token');
  const [selectedReviews, setSelectedReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate('/signIn');
    } else {
      (async () => {
        setLoading(true);
        await dispatch(reviewList({ page: currentPage, limit: 4 }));
        setLoading(false);
      })();
    }
  }, [token, currentPage, dispatch, navigate]);

  const handleDelete = useCallback(async () => {
    setLoading(true);
    await Promise.all(selectedReviews.map((id) => dispatch(deleteReview(id))));
    setSelectedReviews([]);
    setLoading(false);
  }, [dispatch, selectedReviews]);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, [setCurrentPage]);

  const filterUsersByDate = useCallback(() => {
    if (!list) return [];
    if (!startDate || !endDate) return list;
    return list.filter((user) => {
      const userDate = moment(user.createdAt).format('YYYY-MM-DD');
      return userDate >= startDate && userDate <= endDate;
    });
  }, [list, startDate, endDate]);

  const filteredUsers = filterUsersByDate();
  const totalPages = Math.ceil(filteredUsers.length / 4);
  const startIndex = (currentPage - 1) * 4;
  const endIndex = startIndex + 4;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
  const listCount = filteredUsers.length;

  let length;
  switch (pathname) {
    case '/review':
      length = listCount;
      break;
    default:
      length = null;
  }
  console.log(paginatedUsers);
  return (
    <Wrapper>
      <div className="review__page">
        <div className="container">
          <div className="review__page__container">
            <Header />
            {loading ? (
              <div className="admin__dashboard__loader">
                <RingLoader color="#E8920B" />
              </div>
            ) : (
              <section className="review__page__section">
                <div className="review__page__section__title">
                  <h2>Review List</h2>
                  <p>{`${length} Review`}</p>
                </div>
                {length > 0 ? (
                  <>
                    <div className="review__page__section__nav">
                      <Selects setStartDate={setStartDate} setEndDate={setEndDate} />
                    </div>
                    <div className="review__page__section__content">
                      <div className="review__page__section__content__header">
                        <div className="review__page__section__content__header__block">
                          <div>
                            <p>Photo</p>
                            <p>Full Name</p>
                            <p>Date</p>
                            <p>Film</p>
                            <p>Review</p>
                          </div>
                        </div>
                        {paginatedUsers && paginatedUsers.map((review) => (
                          <ReviewCard
                            key={review.id}
                            id={review.id}
                            commentText={review.commentText}
                            createdAt={review.createdAt}
                            photo={review.users.photo}
                            firstName={review.users.firstName}
                            lastName={review.users.lastName}
                            rating={review.rating}
                            selectedReviews={selectedReviews}
                            setSelectedReviews={setSelectedReviews}
                            moviePhoto={review.movies.photos[0].moviePhoto}
                          />
                        ))}
                      </div>
                    </div>
                    {selectedReviews.length > 0 && (
                      <div className="review__page__section__btn">
                        <button type="button" onClick={handleDelete}>Delete</button>
                      </div>
                    )}
                    <Pagination
                      totalPages={totalPages}
                      currentPage={currentPage}
                      handlePageChange={handlePageChange}
                    />
                  </>
                ) : null}
              </section>
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Review;
