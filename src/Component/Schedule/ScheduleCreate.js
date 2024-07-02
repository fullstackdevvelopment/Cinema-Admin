import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { movieLIst } from '../../store/actions/movieList';
import { createSchedule } from '../../store/actions/createSchedule';

function ScheduleCreate() {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.movieList.list);

  const [showTime, setShowTime] = useState('');

  useEffect(() => {
    dispatch(movieLIst({ page: 1, limit: 6 }));
  }, [dispatch]);

  const handleInputChange = (e) => {
    setShowTime(e.target.value);
  };

  console.log(showTime);

  const handleCreateSchedule = useCallback((movieId) => {
    dispatch(createSchedule({ movieId, showTime }));
  }, [dispatch, showTime]);

  return (
    <div className="schedule__dashboard__create">
      {list?.map((item) => (
        <div key={item.id} className="schedule__dashboard__create__block">
          <div className="schedule__dashboard__create__block__img">
            <p>{item.title}</p>
            <img src={`http://localhost:4000/${item.photos[0].moviePhoto}`} alt="cdnskc" />
          </div>
          <div className="schedule__dashboard__create__block__input">
            <input
              id={item.id}
              type="text"
              // value={inputValues}
              onChange={(e) => handleInputChange(e)}
            />
            <Button onClick={() => handleCreateSchedule(item.id)}>
              Create Schedule
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ScheduleCreate;
