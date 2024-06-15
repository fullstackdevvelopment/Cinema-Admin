import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Header from '../Component/Header';
import UserCard from '../Component/User/UserCard';
import Wrapper from '../Component/commons/Wrapper';

function User() {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const token = sessionStorage.getItem('token');
  const dispatch = useDispatch();
  const [filteredUsersCount, setFilteredUsersCount] = useState(0);

  useEffect(() => {
    if (!token) {
      navigate('/signIn');
    }
  }, [token, dispatch, navigate]);

  let length;
  switch (pathname) {
    case '/user':
      length = filteredUsersCount || 0;
      break;
    default:
      length = null;
  }

  return (
    <Wrapper>
      <div className="user__page">
        <div className="container">
          <div className="user__page__container">
            <Header />
            <section className="user__page__section">
              <div className="user__page__section__title">
                <h2>User List</h2>
                <p>{`${length} User`}</p>
              </div>
              <div className="user__page__section__content">
                <div className="user__page__section__content__header">
                  <div className="user__page__section__content__header__block">
                    <div>
                      <p>User</p>
                      <p>Films</p>
                    </div>
                  </div>
                  <UserCard
                    setFilteredUsersCount={setFilteredUsersCount}
                  />
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
