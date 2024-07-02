import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../helpers/Pagination';
import { scheduleList } from '../../store/actions/scheduleList';
import ScheduleItem from './ScheduleItem';

function ScheduleList(props) {
  const { setFilteredScheduleCount } = props;
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const list = useSelector((state) => state.scheduleList.list);

  useEffect(() => {
    dispatch(scheduleList());
  }, [dispatch]);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, [setCurrentPage]);

  const totalPages = Math.ceil(list.length / 2);
  const startIndex = (currentPage - 1) * 2;
  const endIndex = startIndex + 2;
  const paginatedSchedule = list.slice(startIndex, endIndex);
  const paginatedScheduleCount = list.length;

  useEffect(() => {
    if (paginatedSchedule && paginatedSchedule.length > 0) {
      setFilteredScheduleCount(paginatedScheduleCount.toString());
    } else {
      setFilteredScheduleCount(0);
    }
  }, [paginatedSchedule, paginatedScheduleCount]);

  const handleCreate = useCallback(() => {
    navigate('/schedule/create');
  }, []);

  return (
    <div className="schedule__dashboard__table__block">
      <div className="schedule__dashboard__header">
        <Button onClick={handleCreate}>
          Create Schedule
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </div>
      {paginatedSchedule?.map((item) => (
        <div key={item.id} className="schedule__dashboard__table__block__item">
          <ScheduleItem
            title={item.movie.title}
            duration={item.movie.duration}
            moviePhoto={item.movie.photos[0].moviePhoto}
            times={item.schedules[0].times}
            dates={item.schedules[0].date}
          />
        </div>
      ))}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

export default ScheduleList;
