import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { RingLoader } from 'react-spinners';
import Header from '../Component/Header';
import MovieListHeader from '../Component/MovieList/MovieListHeader';
import CreateForm from '../Component/MovieList/Movies/CreateForm';
import ChangeForm from '../Component/MovieList/Movies/ChangeForm';
import MovieList from '../Component/MovieList/Movies/MovieList';
import Wrapper from '../Component/commons/Wrapper';
import { movieLIst } from '../store/actions/movieList';

function Movie() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');
  const dispatch = useDispatch();
  const [filteredMovieCount, setFilteredMovieCount] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate('/signIn');
    } else {
      (async () => {
        setLoading(true);
        await dispatch(movieLIst({ page: 1, limit: 6 }));
        setLoading(false);
      })();
    }
  }, [token, dispatch, navigate]);
  let content;
  let header;
  let length;
  switch (pathname) {
    case '/movie/create':
      content = <CreateForm />;
      header = 'Create Movie';
      length = '';
      break;
    case '/movie/list':
      content = (
        <MovieList
          setFilteredMovieCount={setFilteredMovieCount}
        />
      );
      header = 'Movie List';
      length = `Total ${(filteredMovieCount || 0)} Films`;
      break;
    default:
      if (pathname.match(/^\/movie\/single\/edit\/\d+$/)) {
        content = <ChangeForm />;
        header = 'Edit Movie Data';
        length = 'Change Data';
      } else {
        content = null;
      }
  }
  return (
    <Wrapper>
      <div className="admin__movie">
        <div className="container">
          <div className="admin__movie__container">
            <Header />
            {loading ? (
              <div className="admin__dashboard__loader">
                <RingLoader color="#E8920B" />
              </div>
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Movie;
