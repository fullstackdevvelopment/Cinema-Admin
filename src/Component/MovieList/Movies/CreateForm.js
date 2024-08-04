import React, { useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus, faStar, faStarHalf, faStarHalfStroke, faArrowLeft, faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import ReactStars from 'react-rating-stars-component';
import { uniqueId } from 'lodash';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ToastContainer, toast } from 'react-toastify';
import {
  FormControl, FormControlLabel, Radio, RadioGroup,
} from '@mui/material';
import { createMovie } from '../../../store/actions/createMovie';
import PhotoBlock from './PhotoBlock';
import CreateFileModal from './Modals/CreateFileModal';
import CreateCategoryModal from './Modals/CreateCategoryModal';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-toastify/dist/ReactToastify.css';

function CreateForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
  const [actorArray, setActorArray] = useState([]);
  const [errors, setErrors] = useState(null);
  const [status, setStatus] = useState(null);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    const newErrors = {};
    const categories = JSON.stringify(categoriesArray);
    const files = JSON.stringify(filesArray);
    const actors = JSON.stringify(actorArray);
    const stills = JSON.stringify(stillsArray);
    if (actors !== '[]' && categories !== '[]' && files !== '[]'
      && stills !== '[]'
      && voters !== '') {
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
        voters: Number(voters),
        status,
      };
      try {
        const createMovieResult = await dispatch(createMovie(formData));
        if (createMovie.fulfilled.match(createMovieResult)) {
          toast.success('Film Successfully Produced', {
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
            errors: createMovieResult.payload.errors,
          });
        }
      } catch (error) {
        console.error(error);
      }
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
      });
    }
  }, [dispatch, actorArray, title, duration, storyLine,
    rating, details, language, releaseDate,
    director, voters, categoriesArray, filesArray, stillsArray]);

  const addActor = useCallback(() => {
    setActorArray((prevActors) => {
      const newActor = {
        id: uniqueId(),
        name: '',
        photo: '',
      };
      return [...prevActors, newActor];
    });
  }, [setActorArray]);

  const handleDeleteActors = useCallback((actorId) => {
    const updatedActors = actorArray.filter((actor) => actor.id !== actorId);
    setActorArray(updatedActors);
  }, [actorArray, setActorArray]);

  const handleActorDataChange = useCallback((newActorData) => {
    setActorArray((prevActors) => prevActors.map((actor) => {
      if (actor.id === newActorData.id) {
        return {
          ...actor,
          name: newActorData.name,
          photo: newActorData.photo,
        };
      }
      return actor;
    }));
  }, [setActorArray]);

  const movieInputs = [
    {
      id: 1,
      type: 'text',
      placeholder: 'Film Name',
      value: title,
      onChange: (e) => setTitle(e.target.value),
      error: errors?.errors?.title,
    },
    {
      id: 2,
      type: 'text',
      placeholder: 'Hour',
      value: duration,
      onChange: (e) => setDuration(e.target.value),
      error: errors?.errors?.duration,
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
      error: errors?.errors?.details,
    },
    {
      id: 5,
      type: 'text',
      placeholder: 'Language',
      value: language,
      onChange: (e) => setLanguage(e.target.value),
      error: errors?.errors?.language,
    },
    {
      id: 6,
      type: 'text',
      placeholder: 'Release Date',
      value: releaseDate,
      onChange: (e) => setReleaseDate(e.target.value),
      error: errors?.errors?.releaseDate,
    },
    {
      id: 7,
      type: 'text',
      placeholder: 'Director',
      value: director,
      onChange: (e) => setDirector(e.target.value),
      error: errors?.errors?.director,
    },
  ];

  const handleGoBack = useCallback(() => {
    navigate('/movie/list');
  }, [navigate]);

  return (
    <form className="admin__movie__section__content__form" onSubmit={handleSubmit}>
      <div className="admin__movie__section__content__form__back" onClick={handleGoBack}>
        <FontAwesomeIcon icon={faArrowLeft} />
        <p>Go Back</p>
      </div>
      <div className="admin__movie__section__content__form__first">
        <CreateFileModal
          text="Upload Files For Movie"
          files={filesArray}
          setFiles={setFilesArray}
          stills={stillsArray}
          setStills={setStillsArray}
          errors={errors}
        />
        <CreateCategoryModal
          errors={errors}
          text="Select Categories For Movie"
          selectedCategories={categoriesArray}
          setSelectedCategories={setCategoriesArray}
        />
        <div className="admin__movie__section__content__form__rating">
          <p>Select Movie Rating</p>
          <ReactStars
            size={30}
            count={5}
            isHalf
            color="white"
            activeColor="orange"
            emptyIcon={<FontAwesomeIcon icon={faStarHalfStroke} />}
            halfIcon={<FontAwesomeIcon icon={faStarHalf} />}
            fullIcon={<FontAwesomeIcon icon={faStar} />}
            value={rating}
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
              <div className="input__block" key={input.id}>
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
              <textarea
                placeholder="Description"
                className={errors?.errors?.storyLine ? 'error' : ''}
                value={storyLine}
                onChange={(event) => setStoryLine(event.target.value)}
              />
              {errors?.errors?.storyLine ? (
                <span className="input__error">
                  <FontAwesomeIcon icon={faTriangleExclamation} />
                  {errors.errors.storyLine}
                </span>
              ) : null}
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
            <div
              className={errors?.actors ? 'error' : 'admin__movie__section__content__form__actors__input'}
            >
              {actorArray.map((actor) => (
                <PhotoBlock
                  key={actor.id}
                  actor={actor}
                  onActorDataChange={handleActorDataChange}
                  onDelete={handleDeleteActors}
                />
              ))}
            </div>
            {errors?.actors ? (
              <span className="actors__error">
                <FontAwesomeIcon icon={faTriangleExclamation} />
                {errors.actors}
              </span>
            ) : null}
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
            <button type="submit">Create Film</button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </form>
  );
}

export default CreateForm;
