import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Component/Header';
import UserCard from '../Component/User/UserCard';
import Wrapper from '../Component/commons/Wrapper';

function User() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/signIn');
    }
  }, [token]);
  return (
    <Wrapper>
      <div className="user__page">
        <div className="container">
          <div className="user__page__container">
            <Header />
            <section className="user__page__section">
              <div className="user__page__section__title">
                <h2>User List</h2>
                <p>1500 Tickets</p>
              </div>
              <div className="user__page__section__content">
                <div className="user__page__section__content__header">
                  <div className="user__page__section__content__header__block">
                    <div>
                      <p>User</p>
                      <p>Films</p>
                    </div>
                  </div>
                  <UserCard />
                  <UserCard />
                  <UserCard />
                  <UserCard />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default User;
