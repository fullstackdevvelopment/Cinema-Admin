import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { movieLIst } from '../../store/actions/movieList';

function ScheduleCreate() {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.movieList.list);

  useEffect(() => {
    dispatch(movieLIst({ page: 1, limit: 6 }));
  }, [dispatch]);

  console.log(list);

  return (
    <div className="schedule__dashboard__create">
      {list?.map((item) => (
        <div key={item.id} className="schedule__dashboard__create__block">
          <div className="schedule__dashboard__create__block__img">
            <p>{item.title}</p>
            <img src={`http://localhost:4000/${item.photos[0].moviePhoto}`} alt="cdnskc" />
          </div>
          <div className="schedule__dashboard__create__block__input">
            <input id={item.id} type="text" />
            <Button>
              Create Schedule
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ScheduleCreate;
