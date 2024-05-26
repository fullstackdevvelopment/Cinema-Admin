import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment/moment';
import { userList } from '../../store/actions/userList';

function DashboardAll() {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.userList.list.list);

  useEffect(() => {
    dispatch(userList());
  }, [dispatch]);

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
            Buy Films
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
              {i.firstName}
              {' '}
              {i.lastName}
            </td>
            <td className="movies__dashboard__table__item__info__items">
              {moment(i.createdAt)
                .format('DD.MM.YYYY')}
            </td>
            <td className="movies__dashboard__table__item__info__items">
              {i.bookings.length > 0 ? (
                <FontAwesomeIcon icon={faCheck} />
              ) : (
                <FontAwesomeIcon icon={faXmark} />
              )}
            </td>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <td className="movies__dashboard__table__item__info__items">
              <FontAwesomeIcon
                icon={faTrashCan}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DashboardAll;
