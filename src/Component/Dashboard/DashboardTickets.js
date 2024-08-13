import React, { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { ticketList } from '../../store/actions/ticketList';
import Pagination from '../../helpers/Pagination';
import DatePickerCalendar from '../DatePickerCalendar';

function DashboardTickets(props) {
  const { setFilteredTicketsCount } = props;
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.ticketList.list);
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    dispatch(ticketList({ page: currentPage, limit: 6 }));
  }, [dispatch, currentPage]);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, [setCurrentPage]);

  const filterTicketsByDate = useCallback(() => {
    if (!tickets) return [];
    if (!startDate || !endDate) return tickets;
    return tickets.filter((ticket) => {
      const ticketDate = moment(ticket.createdAt).format('YYYY-MM-DD');
      return moment(ticketDate).isBetween(moment(startDate), moment(endDate), undefined, '[]');
    });
  }, [tickets, startDate, endDate]);

  const filteredUsers = filterTicketsByDate();

  const totalPages = Math.ceil(filteredUsers.length / 6);

  const startIndex = (currentPage - 1) * 6;
  const endIndex = startIndex + 6;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
  const paginatedUsersCount = filteredUsers.length;

  useEffect(() => {
    if (paginatedUsersCount) {
      setFilteredTicketsCount(paginatedUsersCount);
    }
  }, [setFilteredTicketsCount, paginatedUsersCount]);
  return (
    <div style={{ position: 'relative' }}>
      <DatePickerCalendar
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
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
          {paginatedUsers && paginatedUsers.map((ticket) => (
            <tr key={ticket.id} className="movies__dashboard__table__item__info">
              <td className="movies__dashboard__table__item__info__items">
                N
                {ticket.id}
              </td>
              <td className="movies__dashboard__table__item__info__items">
                {ticket.users.firstName}
                {' '}
                {ticket.users.lastName}
              </td>
              <td className="movies__dashboard__table__item__info__items">
                {moment(ticket.createdAt).format('YYYY.MM.DD')}
              </td>
              <td className="movies__dashboard__table__item__info__items__price">
                $
                {ticket.ticketPrice}
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
  );
}

DashboardTickets.propTypes = {
  setFilteredTicketsCount: PropTypes.func.isRequired,
};

export default DashboardTickets;
