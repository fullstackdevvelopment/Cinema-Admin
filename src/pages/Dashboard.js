import React from 'react';
import Header from '../Component/Header';
import DashboardHeader from '../Component/Dashboard/DashboardHeader';
import DashboardTable from '../Component/Dashboard/DashboardTable';

function Dashboard() {
  return (
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
              <DashboardTable />
            </div>
          </section>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;
