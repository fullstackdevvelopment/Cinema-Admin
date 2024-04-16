import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Component/Header';
import MovieListHeader from '../Component/MovieList/MovieListHeader';
import Form from '../Component/MovieList/Movies/Form';
import CategoryList from '../Component/MovieList/Categories/CategoryList';
import MovieList from '../Component/MovieList/Movies/MovieList';

function Movie() {
  const location = useLocation();
  const { pathname } = location;

  let content;
  switch (pathname) {
    case '/movie/create':
      content = <Form />;
      break;
    case '/movie/categories':
      content = <CategoryList />;
      break;
    case '/movie/list':
      content = <MovieList />;
      break;
    default:
      content = null;
  }

  return (
    <div className="admin__movie">
      <div className="container">
        <div className="admin__movie__container">
          <Header />
          <section className="admin__movie__section">
            <div className="admin__movie__section__title">
              <h2>Movie List</h2>
              <p>1500 User</p>
            </div>
            <div className="admin__movie__section__nav">
              <MovieListHeader />
            </div>
            <div className="admin__movie__section__content">
              {content}
              <div className="admin__movie__section__content__btn">
                <button type="submit">Done</button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Movie;
