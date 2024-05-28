import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Component/Header';
import MovieListHeader from '../Component/MovieList/MovieListHeader';
import Form from '../Component/MovieList/Movies/Form';
import MovieList from '../Component/MovieList/Movies/MovieList';
import Wrapper from '../Component/commons/Wrapper';
import { movieLIst } from '../store/actions/movieList';

function Movie() {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');
  const dispatch = useDispatch();
  const list = useSelector((state) => state.movieList.list);

  useEffect(() => {
    dispatch(movieLIst());
  }, [dispatch]);

  useEffect(() => {
    if (!token) {
      navigate('/signIn');
    }
  }, [token]);

  let content;
  let header;
  let length;
  switch (pathname) {
    case '/movie/create':
      content = <Form />;
      header = 'Create Movie';
      length = '';
      break;
    case '/movie/list':
      content = <MovieList />;
      header = 'Movie List';
      length = `Total ${list.length} Films On One Page`;
      break;
    default:
      content = null;
  }

  return (
    <Wrapper>
      <div className="admin__movie">
        <div className="container">
          <div className="admin__movie__container">
            <Header />
            <section className="admin__movie__section">
              <div className="admin__movie__section__title">
                <h2>{header}</h2>
                <p>{length}</p>
              </div>
              <div className="admin__movie__section__nav">
                <MovieListHeader />
              </div>
              <div className="admin__movie__section__content">
                {content}
              </div>
            </section>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Movie;
