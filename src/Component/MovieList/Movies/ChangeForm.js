import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactStars from 'react-rating-stars-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPlus, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { uniqueId } from 'lodash';
import { useNavigate, useParams } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ToastContainer, toast } from 'react-toastify';
import {
  FormControl, FormControlLabel, Radio, RadioGroup,
} from '@mui/material';
import { singleMovie } from '../../../store/actions/singleMovie';
import PhotoBlock from './PhotoBlock';
import ChangeFileModal from './Modals/ChangeFileModal';
import ChangeCategoryModal from './Modals/ChangeCategoryModal';
import { updateMovie } from '../../../store/actions/updateMovie';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-toastify/dist/ReactToastify.css';

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
  const [errors, setErrors] = useState(null);
  const [status, setStatus] = useState(null);

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
      setStatus(movie.status);
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
      status,
    };
    try {
      const updateMovieResult = await dispatch(updateMovie({ formData, movieId }));
      const newErrors = {};
      if (updateMovie.fulfilled.match(updateMovieResult)) {
        toast.success('Movie Data Updated Successfully', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          navigate('/movie/list');
        }, 3000);
      } else {
        if (actors === '[]') {
          newErrors.actors = 'Actors must be not empty';
        }
        if (categories === '[]') {
          newErrors.categories = 'Categories must be not empty';
        }
        if (files === '[]') {
          newErrors.files = 'Files must be not empty';
        }
        if (stills === '[]') {
          newErrors.stills = 'Stills must be not empty';
        }
        if (voters === '') {
          newErrors.voters = 'Voters must be not empty';
        }
        setErrors({
          ...newErrors,
          errors: updateMovieResult.payload.errors,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }, [dispatch, actorsArray, title, duration,
    storyLine, rating, details, language,
    releaseDate, director, voters, categoriesArray,
    filesArray, movieId, stillsArray, status]);

  const movieInputs = [
    {
      id: 1,
      type: 'text',
      placeholder: 'Film Name',
      value: title,
      onChange: (e) => setTitle(e.target.value),
      error: errors?.errors.title,
    },
    {
      id: 2,
      type: 'text',
      placeholder: 'Hour',
      value: duration,
      onChange: (e) => setDuration(e.target.value),
      error: errors?.errors.duration,
    },
    {
      id: 3,
      type: 'number',
      placeholder: 'Voters',
      value: voters,
      onChange: (e) => setVoters(e.target.value),
      error: errors?.voters,
    },
    {
      id: 4,
      type: 'text',
      placeholder: 'Details',
      value: details,
      onChange: (e) => setDetails(e.target.value),
      error: errors?.errors.details,
    },
    {
      id: 5,
      type: 'text',
      placeholder: 'Language',
      value: language,
      onChange: (e) => setLanguage(e.target.value),
      error: errors?.errors.language,
    },
    {
      id: 6,
      type: 'text',
      placeholder: 'Release Date',
      value: releaseDate,
      onChange: (e) => setReleaseDate(e.target.value),
      error: errors?.errors.releaseDate,
    },
    {
      id: 7,
      type: 'text',
      placeholder: 'Director',
      value: director,
      onChange: (e) => setDirector(e.target.value),
      error: errors?.errors.director,
    },
  ];

  const handleGoBack = useCallback(() => {
    navigate('/movie/list');
  }, [navigate]);
  console.log(status);

  return (
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
          errors={errors}
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
            {errors?.errors?.rating ? (
              <div className="error__block">
                <span className="rating__error">
                  <FontAwesomeIcon icon={faTriangleExclamation} />
                  {errors?.errors?.rating}
                </span>
              </div>
            ) : null}
          </div>
        )}
        <div className="admin__movie__section__content__form__status">
          <p className="admin__movie__section__content__form__status__title">Select Movie Status</p>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="status"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <FormControlLabel value="Latest" control={<Radio />} label="Latest" />
              <FormControlLabel value="Coming Soon" control={<Radio />} label="Coming Soon" />
            </RadioGroup>
          </FormControl>
        </div>
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
                  className={input?.error ? 'error' : ''}
                  id={input.id}
                  type={input.type}
                  placeholder={input.placeholder}
                  value={input.value}
                  onChange={input.onChange}
                />
                {input?.error ? (
                  <span className="input__error">
                    <FontAwesomeIcon icon={faTriangleExclamation} />
                    {input.error}
                  </span>
                ) : null}
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
      <ToastContainer />
    </form>
  );
}

export default ChangeForm;
