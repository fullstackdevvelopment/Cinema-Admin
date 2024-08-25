import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPlus, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { uniqueId } from 'lodash';
import { useNavigate, useParams } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ToastContainer, toast } from 'react-toastify';
import {
  FormControl, FormControlLabel, Radio, RadioGroup,
} from '@mui/material';
import Button from '@mui/material/Button';
import { singleMovie } from '../../../store/actions/singleMovie';
import PhotoBlock from './PhotoBlock';
import ChangeFileModal from './Modals/ChangeFileModal';
import ChangeCategoryModal from './Modals/ChangeCategoryModal';
import { updateMovie } from '../../../store/actions/updateMovie';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-toastify/dist/ReactToastify.css';
import { uploadFile } from '../../../store/actions/uploadFile';

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
  const [details, setDetails] = useState('');
  const [language, setLanguage] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [director, setDirector] = useState('');
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
      setDetails(movie.details);
      setLanguage(movie.language);
      setReleaseDate(movie.releaseDate);
      setDirector(movie.director);
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
    setActorsArray((prevActors) => prevActors.map(
      (actor) => (actor.id === newActorData.id ? { ...actor, ...newActorData } : actor),
    ));
  }, []);

  const addActor = useCallback(() => {
    setActorsArray((prevActors) => {
      const newActor = {
        id: uniqueId(),
        name: '',
        photo: '',
        selectedFile: null,
        uploadResult: '',
      };
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
      details,
      releaseDate,
      director,
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
        setErrors({
          ...newErrors,
          errors: updateMovieResult.payload.errors,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }, [dispatch, actorsArray, title, duration,
    storyLine, details, language,
    releaseDate, director, categoriesArray,
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
      type: 'text',
      placeholder: 'Details',
      value: details,
      onChange: (e) => setDetails(e.target.value),
      error: errors?.errors.details,
    },
    {
      id: 4,
      type: 'text',
      placeholder: 'Language',
      value: language,
      onChange: (e) => setLanguage(e.target.value),
      error: errors?.errors.language,
    },
    {
      id: 5,
      type: 'text',
      placeholder: 'Release Date',
      value: releaseDate,
      onChange: (e) => setReleaseDate(e.target.value),
      error: errors?.errors.releaseDate,
    },
    {
      id: 6,
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

  const handleActorData = useCallback((newActorData) => {
    setActorsArray((prevActorsArray) => prevActorsArray.map((actor) => {
      if (actor.id === newActorData.id) {
        return {
          id: newActorData.id,
          name: newActorData.name,
          photo: newActorData.photo,
          uploadResult: 'ok',
        };
      }
      return actor;
    }));
  }, [setActorsArray, actorsArray]);

  const setUploadResult = useCallback((id, result) => {
    setActorsArray((prevActorsArray) => prevActorsArray.map(
      (actor) => (actor.id === id ? {
        ...actor,
        uploadResult: result,
      } : actor),
    ));
  }, []);

  const handleUploadActors = useCallback(async () => {
    // eslint-disable-next-line no-restricted-syntax
    for (const actor of actorsArray) {
      if (actor.name && actor.selectedFile) {
        const formData = new FormData();
        formData.append('name', actor.name);
        formData.append('file', actor.selectedFile);
        try {
          // eslint-disable-next-line no-await-in-loop
          const uploadFileResult = await dispatch(uploadFile(formData));
          if (uploadFile.fulfilled.match(uploadFileResult)) {
            setUploadResult(actor.id, 'ok');
            handleActorData({
              id: actor.id,
              name: uploadFileResult.payload.actor.name,
              photo: uploadFileResult.payload.actor.photo,
            });
          } else {
            setUploadResult(actor.id, 'fail');
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
  }, [dispatch, actorsArray, setUploadResult, handleActorData]);
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
              <FormControlLabel value="Featured movies" control={<Radio />} label="Featured movies" />
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
            <div className="admin__movie__section__content__form__actors__input__btn">
              <Button onClick={handleUploadActors}>
                Upload Actors
              </Button>
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
