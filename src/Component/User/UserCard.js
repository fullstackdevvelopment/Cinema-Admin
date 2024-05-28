import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Movies from './Movies';
import AccordionMovies from './AccordionMovies';
import { bookingList } from '../../store/actions/bookingList';

export default function AccordionUsage() {
  const dispatch = useDispatch();
  const bookingLists = useSelector((state) => state.bookingList.list.list);

  useEffect(() => {
    dispatch(bookingList());
  }, [dispatch]);
  console.log(bookingLists);
  return (
    <div>
      {bookingLists && bookingLists.map((b) => {
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
                <img className="user__card__content__photos__user" src={`http://localhost:4000/${b.photo}`} alt="userphoto" />
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
    </div>
  );
}
