import React, { useCallback, useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus, faStar, faStarHalf, faStarHalfStroke,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { createMovie } from '../../../store/actions/createMovie';
import PhotoBlock from './PhotoBlock';
import ModalFiles from './Modals/ModalFiles';
import Category from './Modals/Category';

function Form() {
  const [files, setFiles] = useState([]);
  const [actors, setActors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [storyLine, setStoryLine] = useState('');
  const [rating, setRating] = useState(null);
  const [details, setDetails] = useState('');
  const [language, setLanguage] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [director, setDirector] = useState('');
  const [voters, setVoters] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    const newFormData = new FormData();
    files.forEach((file) => {
      newFormData.append('files[]', file);
    });
    categories.forEach((category) => {
      newFormData.append('categories[]', category);
    });
    newFormData.append('language', language);
    newFormData.append('title', title);
    newFormData.append('duration', duration);
    newFormData.append('storyLine', storyLine);
    newFormData.append('rating', rating);
    newFormData.append('details', details);
    newFormData.append('releaseDate', releaseDate);
    newFormData.append('director', director);
    newFormData.append('voters', voters);
    dispatch(createMovie(newFormData));
  }, [dispatch, title, duration,
    storyLine, rating, details,
    language, releaseDate, director,
    voters, categories, files]);

  const updateActor = useCallback((actorId, updatedActor) => {
    setActors((prevActors) => prevActors.map((actor) => {
      if (actor.id === actorId) {
        return { ...actor, ...updatedActor };
      }
      return actor;
    }));
  }, [setActors]);

  const addActor = useCallback(() => {
    const newActor = {
      id: uuidv4(),
      name: '',
      photo: '',
    };
    const isActorUnique = actors.every((actor) => actor.id !== newActor.id);
    if (isActorUnique) {
      setActors((prevActors) => [...prevActors, newActor]);
    }
  }, []);
  console.log(actors);
  return (
    <form className="admin__movie__section__content__form" onSubmit={handleSubmit}>
      <div className="admin__movie__section__content__form__first">
        <ModalFiles files={files} setFiles={setFiles} />
        <Category selectedCategories={categories} setSelectedCategories={setCategories} />
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
            <input
              type="text"
              placeholder="Film Name"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <input
              type="text"
              placeholder="Hour"
              value={duration}
              onChange={(event) => setDuration(event.target.value)}
            />
            <input
              type="number"
              placeholder="Voters"
              value={voters}
              onChange={(event) => setVoters(event.target.value)}
            />
            <input
              type="text"
              placeholder="Details"
              value={details}
              onChange={(event) => setDetails(event.target.value)}
            />
            <input
              type="text"
              placeholder="Language"
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
            />
            <input
              type="text"
              placeholder="Release Date"
              value={releaseDate}
              onChange={(event) => setReleaseDate(event.target.value)}
            />
            <input
              type="text"
              placeholder="Director"
              value={director}
              onChange={(event) => setDirector(event.target.value)}
            />
          </div>
          <div className="admin__movie__section__content__form__block">
            <div className="admin__movie__section__content__form__first__textarea">
              <textarea
                placeholder="Description"
                value={storyLine}
                onChange={(event) => setStoryLine(event.target.value)}
              />
            </div>
            <div className="admin__movie__section__content__form__second">
              <div className="admin__movie__section__content__form__actors">
                <div className="admin__movie__section__content__form__actors__input">
                  <div className="admin__movie__section__content__form__actors__title">
                    <h2>Actors Name</h2>
                  </div>
                  <div className="admin__movie__section__content__form__actors__input">
                    {actors.map((actor) => (
                      <PhotoBlock
                        key={actor.id}
                        actor={actor}
                        onActorChange={updateActor}
                      />
                    ))}
                  </div>
                  <div className="admin__movie__section__content__form__actors__input__btn" onClick={addActor}>
                    <p className="admin__movie__section__content__form__actors__input__btn__p">
                      Add new
                      <FontAwesomeIcon icon={faPlus} />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="admin__movie__section__content__btn">
        <button type="submit">Done</button>
      </div>
    </form>
  );
}

export default Form;
