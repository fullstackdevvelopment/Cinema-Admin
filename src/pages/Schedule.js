import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { RingLoader } from 'react-spinners';
import Header from '../Component/Header';
import Wrapper from '../Component/commons/Wrapper';
import ScheduleList from '../Component/Schedule/ScheduleList';
import { scheduleList } from '../store/actions/scheduleList';
import ScheduleCreate from '../Component/Schedule/ScheduleCreate';

function Schedule() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');
  const dispatch = useDispatch();
  const [filteredScheduleCount, setFilteredScheduleCount] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate('/signIn');
    } else {
      (async () => {
        setLoading(true);
        await dispatch(scheduleList());
        setLoading(false);
      })();
    }
  }, [token, dispatch, navigate]);

  let content;
  let length;
  let title;
  switch (pathname) {
    case '/schedule/list':
      content = (
        <ScheduleList
          setFilteredScheduleCount={setFilteredScheduleCount}
        />
      );
      title = 'Schedule List';
      length = `${filteredScheduleCount} Schedule`;
      break;
    case '/schedule/create':
      content = <ScheduleCreate />;
      title = 'Create Schedule';
      length = null;
      break;
    default:
      content = null;
      title = null;
      length = null;
  }
  return (
    <Wrapper>
      <div className="schedule__dashboard">
        <div className="container">
          <div className="schedule__dashboard__container">
            <Header />
            {loading ? (
              <div className="admin__dashboard__loader">
                <RingLoader color="#E8920B" />
              </div>
            ) : (
              <section className="schedule__dashboard__section">
                <div className="schedule__dashboard__article">
                  <h2 className="schedule__dashboard__title">{title}</h2>
                  <p className="schedule__dashboard__dec">
                    {length}
                  </p>
                </div>
                <div className="schedule__dashboard__table">
                  {content}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Schedule;
