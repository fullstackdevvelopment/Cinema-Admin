import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../Component/Header';
import DashboardHeader from '../Component/Dashboard/DashboardHeader';
import DashboardAll from '../Component/Dashboard/DashboardAll';
import DashboardTickets from '../Component/Dashboard/DashboardTickets';
import Wrapper from '../Component/commons/Wrapper';

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/signIn');
    }
  }, [token]);
  return (
    <Wrapper>
      <div className="admin__dashboard">
        <div className="container">
          <div className="admin__dashboard__container">
            <Header />
            <section className="admin__dashboard__section">
              <div className="admin__dashboard__article">
                <h2 className="admin__dashboard__title">Dashboard</h2>
                <p className="admin__dashboard__dec">1500 User</p>
              </div>

              <div className="admin__dashboard__header">
                <DashboardHeader />
              </div>

              <div className="admin__dashboard__table">
                {pathname === '/dashboard/all' ? <DashboardAll /> : <DashboardTickets />}
              </div>
            </section>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Dashboard;
