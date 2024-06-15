import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Movies from './Movies';
import AccordionMovies from './AccordionMovies';
import { bookingList } from '../../store/actions/bookingList';
import Pagination from '../../helpers/Pagination';
import userError from '../../assets/images/userError.webp';

export default function AccordionUsage(props) {
  const { setFilteredUsersCount } = props;
  const dispatch = useDispatch();
  const bookingLists = useSelector((state) => state.bookingList.list);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(bookingList({ page: currentPage, limit: 4 }));
  }, [dispatch, currentPage]);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, [setCurrentPage]);

  const totalPages = Math.ceil(bookingLists.length / 4);

  const startIndex = (currentPage - 1) * 4;
  const endIndex = startIndex + 4;
  const paginatedUsers = bookingLists.slice(startIndex, endIndex);
  const paginatedUsersCount = bookingLists.length;

  useEffect(() => {
    if (paginatedUsersCount) {
      setFilteredUsersCount(paginatedUsersCount);
    }
  }, [setFilteredUsersCount, paginatedUsersCount]);
  return (
    <div>
      {paginatedUsers && paginatedUsers.map((b) => {
        const firstFiveBookings = b.bookings.slice(0, 5);
        const remainingBookings = b.bookings.slice(5);

        return (
          <Accordion key={b.id} className="user__card__content">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              className="user__card__content__block"
            >
              <div className="user__card__content__photos">
                <img
                  className="user__card__content__photos__user"
                  src={`http://localhost:4000/${b.photo}`}
                  alt="userphoto"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = userError;
                  }}
                />
                <p>
                  {b.firstName}
                  {' '}
                  {b.lastName}
                </p>
                {firstFiveBookings.map((booking) => (
                  <Movies
                    key={booking.id}
                    title={booking.movies.title}
                    filmPhoto={booking.movies.photos[0].moviePhoto}
                  />
                ))}
              </div>
            </AccordionSummary>
            <div className="user__card__content__photos__block">
              {remainingBookings.map((booking) => (
                <AccordionMovies
                  key={booking.id}
                  title={booking.movies.title}
                  filmPhoto={booking.movies.photos[0].moviePhoto}
                />
              ))}
            </div>
          </Accordion>
        );
      })}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

AccordionUsage.propTypes = {
  setFilteredUsersCount: PropTypes.func.isRequired,
};
