import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { bookingList } from '../../store/actions/bookingList';

function DashboardTickets() {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.bookingList.list.list);

  useEffect(() => {
    dispatch(bookingList());
  }, []);
  return (
    <table className="movies__dashboard__table">
      <thead>
        <tr className="movies__dashboard__table__thead">
          <td className="movies__dashboard__table__item">
            Number
          </td>
          <td className="movies__dashboard__table__item">
            Full Name
          </td>
          <td className="movies__dashboard__table__item">
            Date
          </td>
          <td className="movies__dashboard__table__item">
            Price
          </td>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <td className="movies__dashboard__table__item" />
        </tr>
      </thead>
      <tbody>
        {list && list.map((i) => (
          <tr key={i.id} className="movies__dashboard__table__item__info">
            <td className="movies__dashboard__table__item__info__items">
              N
              {i.id}
            </td>
            <td className="movies__dashboard__table__item__info__items">
              {i.users.firstName}
              {' '}
              {i.users.lastName}
            </td>
            <td className="movies__dashboard__table__item__info__items">
              {moment(i.createdAt).format('DD.MM.YYYY')}
            </td>
            <td className="movies__dashboard__table__item__info__items__price">
              $
              {i.ticketPrice}
            </td>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <td className="movies__dashboard__table__item__info__items">
              <FontAwesomeIcon
                icon={faCheck}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DashboardTickets;
