import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Component/Header';
import DashboardHeader from '../Component/Dashboard/DashboardHeader';
import DashboardAll from '../Component/Dashboard/DashboardAll';
import DashboardTickets from '../Component/Dashboard/DashboardTickets';
import Wrapper from '../Component/commons/Wrapper';
import { userList } from '../store/actions/userList';
import { bookingList } from '../store/actions/bookingList';

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const token = sessionStorage.getItem('token');
  const dispatch = useDispatch();
  const userLists = useSelector((state) => state.userList.list.list);
  const bookingLists = useSelector((state) => state.bookingList.list.list);

  useEffect(() => {
    if (!token) {
      navigate('/signIn');
    }
    dispatch(userList());
    dispatch(bookingList());
  }, [token, dispatch]);

  let content;
  let length;
  switch (pathname) {
    case '/dashboard/all':
      content = <DashboardAll />;
      length = userLists?.length;
      break;
    case '/dashboard/tickets':
      content = <DashboardTickets />;
      length = bookingLists?.length;
      break;
    default:
      content = null;
  }
  return (
    <Wrapper>
      <div className="admin__dashboard">
        <div className="container">
          <div className="admin__dashboard__container">
            <Header />
            <section className="admin__dashboard__section">
              <div className="admin__dashboard__article">
                <h2 className="admin__dashboard__title">Dashboard</h2>
                <p className="admin__dashboard__dec">
                  {`${length} User`}
                </p>
              </div>

              <div className="admin__dashboard__header">
                <DashboardHeader />
              </div>

              <div className="admin__dashboard__table">
                {content}
              </div>
            </section>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Dashboard;
