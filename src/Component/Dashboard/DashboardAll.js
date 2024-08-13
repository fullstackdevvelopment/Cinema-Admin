import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment/moment';
import { RingLoader } from 'react-spinners';
import { userList } from '../../store/actions/userList';
import Pagination from '../../helpers/Pagination';
import { deleteUser } from '../../store/actions/deleteUser';
import DatePickerCalendar from '../DatePickerCalendar';
import { ticketList } from '../../store/actions/ticketList';

function DashboardAll(props) {
  const { setFilteredUsersCount } = props;
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const list = useSelector((state) => state.userList.list);
  const tickets = useSelector((state) => state.ticketList.list);
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await dispatch(userList({
        page: currentPage,
        limit: 6,
      }));
      await dispatch(ticketList({ page: currentPage, limit: 6 }));
      setLoading(false);
    })();
  }, [dispatch, currentPage]);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, [setCurrentPage]);

  const filterUsersByDate = useCallback(() => {
    if (!list) return [];
    if (!startDate || !endDate) return list;
    return list.filter((user) => {
      const userDate = moment(user.createdAt).format('YYYY-MM-DD');
      return moment(userDate).isBetween(moment(startDate), moment(endDate), undefined, '[]');
    });
  }, [list, startDate, endDate]);

  const filteredUsers = filterUsersByDate();
  const totalPages = Math.ceil(filteredUsers.length / 6);
  const startIndex = (currentPage - 1) * 6;
  const endIndex = startIndex + 6;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
  const paginatedUsersCount = filteredUsers.length;

  useEffect(() => {
    if (paginatedUsersCount || paginatedUsersCount === 0) {
      setFilteredUsersCount(paginatedUsersCount);
    }
  }, [setFilteredUsersCount, paginatedUsersCount]);

  const handleDeleteUser = useCallback(async (userId) => {
    await dispatch(deleteUser(userId));
  }, [dispatch]);

  return (
    <div style={{ position: 'relative' }}>
      {loading ? (
        <div className="admin__dashboard__loader">
          <RingLoader color="#E8920B" />
        </div>
      ) : (
        <>
          <DatePickerCalendar
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
          <div className="admin__dashboard__all">
            <table className="movies__dashboard__table">
              <thead>
                <tr className="movies__dashboard__table__thead">
                  <td className="movies__dashboard__table__item">Number</td>
                  <td className="movies__dashboard__table__item">Full Name</td>
                  <td className="movies__dashboard__table__item">Date</td>
                  <td className="movies__dashboard__table__item">Buy Films</td>
                  <td className="movies__dashboard__table__item">Total Price</td>
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <td className="movies__dashboard__table__item" />
                </tr>
              </thead>
              <tbody>
                {paginatedUsers?.map((user) => {
                  const u = tickets.filter((booking) => booking.userId === user.id);
                  const totalPrice = u.reduce((total, booking) => total + booking.ticketPrice, 0);
                  return (
                    <tr key={user.id} className="movies__dashboard__table__item__info">
                      <td className="movies__dashboard__table__item__info__items">
                        N
                        {user.id}
                      </td>
                      <td className="movies__dashboard__table__item__info__items">
                        {user.firstName}
                        {' '}
                        {user.lastName}
                      </td>
                      <td className="movies__dashboard__table__item__info__items">
                        {moment(user.createdAt).format('YYYY.MM.DD')}
                      </td>
                      <td className="movies__dashboard__table__item__info__items">
                        {u.length > 0 ? (
                          <FontAwesomeIcon icon={faCheck} />
                        ) : (
                          <FontAwesomeIcon icon={faXmark} />
                        )}
                      </td>
                      <td className="movies__dashboard__table__item__info__items">
                        {`$${totalPrice}`}
                      </td>
                      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                      <td className="movies__dashboard__table__item__info__items">
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          onClick={() => handleDeleteUser(user.id)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
}

DashboardAll.propTypes = {
  setFilteredUsersCount: PropTypes.func.isRequired,
};

export default DashboardAll;
