import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { toast, ToastContainer } from 'react-toastify';
import { movieLIst } from '../../store/actions/movieList';
import { createSchedule } from '../../store/actions/createSchedule';
import Pagination from '../../helpers/Pagination';

function ScheduleCreate() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const list = useSelector((state) => state.movieList.list);
  const [showTimes, setShowTimes] = useState({});

  useEffect(() => {
    dispatch(movieLIst({ page: 1, limit: 6 }));
  }, [dispatch]);

  const handleInputChange = (e, movieId) => {
    setShowTimes((prevShowTimes) => ({
      ...prevShowTimes,
      [movieId]: e.target.value,
    }));
  };

  const handleCreateSchedule = useCallback(async (movieId) => {
    const showTime = showTimes[movieId];
    const createScheduleResult = await dispatch(createSchedule({ movieId, showTime }));
    if (createSchedule.fulfilled.match(createScheduleResult)) {
      setShowTimes((prevShowTimes) => ({
        ...prevShowTimes,
        [movieId]: '',
      }));
      toast.success('Schedule Successfully Created', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error('Something went wrong', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [dispatch, showTimes]);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, [setCurrentPage]);

  const totalPages = Math.ceil(list.length / 2);
  const startIndex = (currentPage - 1) * 2;
  const endIndex = startIndex + 2;
  const paginatedSchedule = list.slice(startIndex, endIndex);

  return (
    <div className="schedule__dashboard__create">
      {paginatedSchedule?.map((item) => (
        <div key={item.id} className="schedule__dashboard__create__block">
          <div className="schedule__dashboard__create__block__img">
            <p>{item.title}</p>
            <img src={`http://localhost:4000/${item.photos[0].moviePhoto}`} alt="cdnskc" />
          </div>
          <div className="schedule__dashboard__create__block__input">
            <input
              id={item.id}
              type="text"
              value={showTimes[item.id] || ''}
              onChange={(e) => handleInputChange(e, item.id)}
            />
            <Button onClick={() => handleCreateSchedule(item.id)}>
              Create Schedule
            </Button>
          </div>
        </div>
      ))}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
      <ToastContainer />
    </div>
  );
}

export default ScheduleCreate;
