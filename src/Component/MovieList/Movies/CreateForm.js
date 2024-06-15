import React, { useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus, faStar, faStarHalf, faStarHalfStroke, faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import ReactStars from 'react-rating-stars-component';
import { uniqueId } from 'lodash';
import { Alert, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createMovie } from '../../../store/actions/createMovie';
import PhotoBlock from './PhotoBlock';
import CreateFileModal from './Modals/CreateFileModal';
import CreateCategoryModal from './Modals/CreateCategoryModal';

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
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    const categories = JSON.stringify(categoriesArray);
    const files = JSON.stringify(filesArray);
    const actors = JSON.stringify(actorArray);
    const stills = JSON.stringify(stillsArray);
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
      const response = await dispatch(createMovie(formData));
      if (response.error) {
        let errorMessage = '';
        const { errors } = response.payload;

        Object.keys(errors).forEach((field) => {
          errorMessage += `${field}: ${errors[field]}, `;
        });

        errorMessage = errorMessage.slice(0, -2);

        throw new Error(errorMessage);
      }

      setSnackbarMessage('Movie Created successfully');
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
  }, [dispatch, actorArray, title, duration, storyLine,
    rating, details, language, releaseDate,
    director, voters, categoriesArray, filesArray, stillsArray]);

  const addActor = useCallback(() => {
    setActorArray((prevActors) => {
      const newActor = { id: uniqueId(), name: '', photo: '' };
      return [...prevActors, newActor];
    });
  }, [setActorArray]);

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
          <CreateFileModal
            text="Upload Files For Movie"
            files={filesArray}
            setFiles={setFilesArray}
            stills={stillsArray}
            setStills={setStillsArray}
          />
          <CreateCategoryModal
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
                <textarea
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
                {actorArray.map((actor) => (
                  <PhotoBlock
                    key={actor.id}
                    actor={actor}
                    onActorDataChange={handleActorDataChange}
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
              <button type="submit">Create Film</button>
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

export default CreateForm;
