import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Component/Header';
import UserCard from '../Component/User/UserCard';
import Wrapper from '../Component/commons/Wrapper';
import { bookingList } from '../store/actions/bookingList';

function User() {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const token = sessionStorage.getItem('token');
  const dispatch = useDispatch();
  const bookingLists = useSelector((state) => state.bookingList.list.list);

  useEffect(() => {
    if (!token) {
      navigate('/signIn');
    }
    dispatch(bookingList());
  }, [token, dispatch]);

  let length;
  switch (pathname) {
    case '/user':
      length = bookingLists?.length;
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
                <p>{`${length} Tickets`}</p>
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
