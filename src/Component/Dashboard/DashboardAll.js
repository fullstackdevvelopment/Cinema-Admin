import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment/moment';
import { RingLoader } from 'react-spinners';
import { userList } from '../../store/actions/userList';
import Pagination from '../../helpers/Pagination';
import Selects from '../Selects';

function DashboardAll(props) {
  const { setFilteredUsersCount } = props;
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const list = useSelector((state) => state.userList.list);
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await dispatch(userList({ page: currentPage, limit: 6 }));
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
      const userDate = moment(user.createdAt)
        .format('YYYY-MM-DD');
      return userDate >= startDate && userDate <= endDate;
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

  return (
    <div>
      {loading ? (
        <div className="admin__dashboard__loader">
          <RingLoader color="#E8920B" />
        </div>
      ) : (
        <div className="admin__dashboard__all">
          <div className="movies__nav__dashboard__header__select">
            <div className="movies__nav__dashboard__select__item">
              <Selects setStartDate={setStartDate} setEndDate={setEndDate} />
            </div>
          </div>
          <table className="movies__dashboard__table">
            <thead>
              <tr className="movies__dashboard__table__thead">
                <td className="movies__dashboard__table__item">Number</td>
                <td className="movies__dashboard__table__item">Full Name</td>
                <td className="movies__dashboard__table__item">Date</td>
                <td className="movies__dashboard__table__item">Buy Films</td>
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <td className="movies__dashboard__table__item" />
              </tr>
            </thead>
            <tbody>
              {paginatedUsers?.map((i) => (
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
                    {moment(i.createdAt).format('YYYY.MM.DD')}
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
                    <FontAwesomeIcon icon={faTrashCan} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}

DashboardAll.propTypes = {
  setFilteredUsersCount: PropTypes.func.isRequired,
};

export default DashboardAll;
