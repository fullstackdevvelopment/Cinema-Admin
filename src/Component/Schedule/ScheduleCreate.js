import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { toast, ToastContainer } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { ClipLoader } from 'react-spinners';
import { movieLIst } from '../../store/actions/movieList';
import { createSchedule } from '../../store/actions/createSchedule';
import Pagination from '../../helpers/Pagination';

function ScheduleCreate() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const list = useSelector((state) => state.movieList.list.allMovies);
  const [showTimes, setShowTimes] = useState({});
  const [loading, setLoading] = useState({});

  useEffect(() => {
    dispatch(movieLIst());
  }, [dispatch]);

  const handleDateChange = (date, movieId) => {
    setShowTimes((prevShowTimes) => ({
      ...prevShowTimes,
      [movieId]: date,
    }));
  };

  const handleCreateSchedule = useCallback(async (movieId) => {
    setLoading((prevLoading) => ({ ...prevLoading, [movieId]: true }));
    const showTime = moment(showTimes[movieId]).format('YYYY-MM-DD HH:mm');
    const time = moment(new Date()).format('YYYY-MM-DD HH:mm');
    console.log(showTime);
    console.log(time);
    if (showTime !== time) {
      const createScheduleResult = await dispatch(createSchedule({ movieId, showTime }));
      if (createSchedule.fulfilled.match(createScheduleResult)) {
        setLoading((prevLoading) => ({ ...prevLoading, [movieId]: false }));
        setShowTimes((prevShowTimes) => ({
          ...prevShowTimes,
          [movieId]: null,
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
        setLoading((prevLoading) => ({ ...prevLoading, [movieId]: false }));
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
    } else {
      setLoading((prevLoading) => ({ ...prevLoading, [movieId]: false }));
      setShowTimes((prevShowTimes) => ({
        ...prevShowTimes,
        [movieId]: null,
      }));
      toast.error('Please Select Date', {
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

  // eslint-disable-next-line no-unsafe-optional-chaining
  const totalPages = Math.ceil(list?.length / 2);
  const startIndex = (currentPage - 1) * 2;
  const endIndex = startIndex + 2;
  const paginatedSchedule = list?.slice(startIndex, endIndex);

  return (
    <div className="schedule__dashboard__create">
      {paginatedSchedule?.map((item) => (
        <div key={item.id} className="schedule__dashboard__create__block">
          <div className="schedule__dashboard__create__block__img">
            <p>{item.title}</p>
            <img src={`http://localhost:4000/${item.photos[0].moviePhoto}`} alt={item.title} />
          </div>
          <div className="schedule__dashboard__create__block__input">
            <DatePicker
              selected={showTimes[item.id]}
              onChange={(date) => handleDateChange(date, item.id)}
              showTimeSelect
              dateFormat="yyyy-MM-dd HH:mm"
              placeholderText="Select Date and Time"
              timeCaption="Time"
              timeIntervals={15}
              timeFormat="HH:mm"
            />
            <Button onClick={() => handleCreateSchedule(item.id)}>
              Create Schedule
              {loading[item.id] ? (
                <ClipLoader color="#E8920B" />
              ) : null}
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
