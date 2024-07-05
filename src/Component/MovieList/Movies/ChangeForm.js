import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactStars from 'react-rating-stars-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { uniqueId } from 'lodash';
import { useNavigate, useParams } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material'; // <-- Добавьте эти строки
import { singleMovie } from '../../../store/actions/singleMovie';
import PhotoBlock from './PhotoBlock';
import ChangeFileModal from './Modals/ChangeFileModal';
import ChangeCategoryModal from './Modals/ChangeCategoryModal';
import { updateMovie } from '../../../store/actions/updateMovie';

function ChangeForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const movie = useSelector((state) => state.singleMovie.list.movie);
  const [filesArray, setFilesArray] = useState([]);
  const [stillsArray, setStillsArray] = useState([]);
  const [categoriesArray, setCategoriesArray] = useState([]);
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [storyLine, setStoryLine] = useState('');
  const [rating, setRating] = useState(null);
  const [details, setDetails] = useState('');
  const [language, setLanguage] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [director, setDirector] = useState('');
  const [voters, setVoters] = useState('');
  const [actorsArray, setActorsArray] = useState([]);
  const { movieId } = useParams();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    dispatch(singleMovie(movieId));
  }, [dispatch]);

  useEffect(() => {
    if (movie !== undefined) {
      setTitle(movie.title);
      setDuration(movie.duration);
      setStoryLine(movie.storyLine);
      setRating(movie.rating);
      setDetails(movie.details);
      setLanguage(movie.language);
      setReleaseDate(movie.releaseDate);
      setDirector(movie.director);
      setVoters(movie.voters);
      setStillsArray(movie.stills.map((still) => ({
        id: uniqueId(),
        stillPath: still.stillPath,
        movieId: still.movieId,
      })));
      setActorsArray(movie.actors.map((actor) => ({
        id: uniqueId(),
        name: actor.name,
        photo: actor.photo,
      })));
      setCategoriesArray(movie.categories.map(
        (category) => category.movieCategories.categoryId.toString(),
      ));
      setFilesArray([
        ...movie.photos.map((photo) => ({
          id: uniqueId(),
          movieId: photo.movieId,
          moviePhoto: photo.moviePhoto,
        })),
        ...movie.trailers.map((trailer) => ({
          id: uniqueId(),
          movieId: trailer.movieId,
          trailer: trailer.trailer,
        })),
      ]);
    }
  }, [movie]);

  const handleActorDataChange = useCallback((newActorData) => {
    setActorsArray((prevActors) => prevActors.map((actor) => {
      if (actor.id === newActorData.id) {
        return {
          ...actor,
          name: newActorData.name,
          photo: newActorData.photo,
        };
      }
      return actor;
    }));
  }, [setActorsArray]);

  const addActor = useCallback(() => {
    setActorsArray((prevActors) => {
      const newActor = { id: Number(uniqueId()), name: '', photo: '' };
      return [...prevActors, newActor];
    });
  }, [setActorsArray]);

  const handleDeleteActors = useCallback((actorId) => {
    setActorsArray((prevActors) => prevActors.filter((actor) => actor.id !== actorId));
  }, [setActorsArray]);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    const categories = JSON.stringify(categoriesArray);
    const actors = JSON.stringify(actorsArray);
    const stills = JSON.stringify(stillsArray);
    const files = JSON.stringify(filesArray);
    const formData = {
      files,
      actors,
      stills,
      categories,
      language,
      title,
      duration,
      storyLine,
      rating,
      details,
      releaseDate,
      director,
      voters,
    };
    try {
      const response = await dispatch(updateMovie({ formData, movieId }));
      if (response.error) {
        throw new Error(response.payload.message);
      }
      setSnackbarMessage('Movie updated successfully');
      setSnackbarSeverity('success');
      setTimeout(() => {
        navigate('/movie/list');
      }, 3000);
    } catch (error) {
      setSnackbarMessage(error.message || 'An error occurred');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
    }
  }, [dispatch, actorsArray, title, duration,
    storyLine, rating, details, language,
    releaseDate, director, voters, categoriesArray,
    filesArray, movieId, stillsArray]);

  const movieInputs = [
    {
      id: 1,
      type: 'text',
      placeholder: 'Film Name',
      value: title,
      onChange: (e) => setTitle(e.target.value),
    },
    {
      id: 2,
      type: 'text',
      placeholder: 'Hour',
      value: duration,
      onChange: (e) => setDuration(e.target.value),
    },
    {
      id: 3,
      type: 'number',
      placeholder: 'Voters',
      value: voters,
      onChange: (e) => setVoters(e.target.value),
    },
    {
      id: 4,
      type: 'text',
      placeholder: 'Details',
      value: details,
      onChange: (e) => setDetails(e.target.value),
    },
    {
      id: 5,
      type: 'text',
      placeholder: 'Language',
      value: language,
      onChange: (e) => setLanguage(e.target.value),
    },
    {
      id: 6,
      type: 'text',
      placeholder: 'Release Date',
      value: releaseDate,
      onChange: (e) => setReleaseDate(e.target.value),
    },
    {
      id: 7,
      type: 'text',
      placeholder: 'Director',
      value: director,
      onChange: (e) => setDirector(e.target.value),
    },
  ];

  const handleGoBack = useCallback(() => {
    navigate('/movie/list');
  }, [navigate]);

  return (
    <>
      <form className="admin__movie__section__content__form" onSubmit={handleSubmit}>
        <div className="admin__movie__section__content__form__back" onClick={handleGoBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
          <p>Go Back</p>
        </div>
        <div className="admin__movie__section__content__form__first">
          <ChangeFileModal
            text="Edit Files For Movie"
            files={filesArray}
            setFiles={setFilesArray}
            stills={stillsArray}
            setStills={setStillsArray}
          />
          <ChangeCategoryModal
            text="Edit Categories For Movie"
            selectedCategories={categoriesArray}
            setSelectedCategories={setCategoriesArray}
          />
          {rating !== null && (
            <div className="admin__movie__section__content__form__rating">
              <p>Edit Movie Rating</p>
              <ReactStars
                classNames="review__stars"
                size={30}
                count={5}
                isHalf
                value={rating}
                color="white"
                activeColor="orange"
                onChange={setRating}
              />
            </div>
          )}
          <div className="admin__movie__section__content__form__first__input__block">
            <div className="admin__movie__section__content__form__first__input__block__title">
              <p>Please fill out all fields</p>
            </div>
            <div className="admin__movie__section__content__form__first__input">
              {movieInputs.map((input) => (
                <div key={input.id}>
                  <label
                    className="admin__movie__section__content__form__first__input__label"
                    htmlFor={input.id}
                  >
                    {input.placeholder}
                  </label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    value={input.value}
                    onChange={input.onChange}
                  />
                </div>
              ))}
            </div>
            <div className="admin__movie__section__content__form__block">
              <div className="admin__movie__section__content__form__first__textarea">
                <label htmlFor="Description">Description</label>
                <textarea
                  id="Description"
                  placeholder="Description"
                  value={storyLine}
                  onChange={(event) => setStoryLine(event.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="admin__movie__section__content__form__second">
          <div className="admin__movie__section__content__form__actors">
            <div className="admin__movie__section__content__form__actors__input">
              <div className="admin__movie__section__content__form__actors__title">
                <h2>Actors Name</h2>
              </div>
              <div className="admin__movie__section__content__form__actors__input">
                {actorsArray.map((actor) => (
                  <PhotoBlock
                    key={actor.id}
                    actor={actor}
                    onActorDataChange={handleActorDataChange}
                    onDelete={handleDeleteActors}
                  />
                ))}
              </div>
              <div
                className="admin__movie__section__content__form__actors__input__btn"
                onClick={addActor}
              >
                <p className="admin__movie__section__content__form__actors__input__btn__p">
                  Add new
                  <FontAwesomeIcon icon={faPlus} />
                </p>
              </div>
            </div>
            <div className="admin__movie__section__content__btn">
              <button type="submit">Save Film</button>
            </div>
          </div>
        </div>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default ChangeForm;
