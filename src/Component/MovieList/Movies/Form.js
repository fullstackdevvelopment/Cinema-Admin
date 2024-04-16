import React, { useCallback, useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus, faStar, faStarHalf, faStarHalfStroke,
} from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as DownloadIcon } from '../../../assets/icons/download.svg';
import PhotoBlock from './PhotoBlock';

function Form() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [actorPhoto1, setActorPhoto1] = useState(null);
  const [actorPhoto2, setActorPhoto2] = useState(null);
  const [actorPhoto3, setActorPhoto3] = useState(null);
  const [actorPhoto4, setActorPhoto4] = useState(null);
  const [actorPhoto5, setActorPhoto5] = useState(null);
  const [actorPhoto6, setActorPhoto6] = useState(null);

  const handleFileChange = useCallback((event) => {
    const file = event.target.files[0];
    setSelectedFile(URL.createObjectURL(file));
  }, []);
  return (
    <form className="admin__movie__section__content__form">
      <div className="admin__movie__section__content__form__first">
        <div className="admin__movie__section__content__form__first__input">
          <input id="file" type="file" accept="image/*" onChange={handleFileChange} />
          <label htmlFor="file">
            Photo
            <DownloadIcon />
            {selectedFile && <img className="admin__movie__section__content__form__first__input__userPhoto" src={selectedFile} alt="Selected" />}
          </label>
          <input type="text" placeholder="Film Name" />
          <input type="text" placeholder="Hour" />
        </div>
        <div className="admin__movie__section__content__form__first__textarea">
          <textarea placeholder="Description" />
        </div>
      </div>
      <div className="admin__movie__section__content__form__rating">
        <ReactStars
          size={30}
          count={5}
          isHalf
          color="white"
          activeColor="orange"
          emptyIcon={<FontAwesomeIcon icon={faStarHalfStroke} />}
          halfIcon={<FontAwesomeIcon icon={faStarHalf} />}
          fullIcon={<FontAwesomeIcon icon={faStar} />}
        />
      </div>
      <div className="admin__movie__section__content__form__second">
        <div className="admin__movie__section__content__form__actors">
          <div className="admin__movie__section__content__form__actors__title">
            <h2>Actors Name & Photo</h2>
          </div>
          <div className="admin__movie__section__content__form__actors__input">
            <PhotoBlock selectedFile={actorPhoto1} setSelectedFile={setActorPhoto1} id={1} />
            <PhotoBlock selectedFile={actorPhoto2} setSelectedFile={setActorPhoto2} id={2} />
            <PhotoBlock selectedFile={actorPhoto3} setSelectedFile={setActorPhoto3} id={3} />
            <PhotoBlock selectedFile={actorPhoto4} setSelectedFile={setActorPhoto4} id={4} />
            <PhotoBlock selectedFile={actorPhoto5} setSelectedFile={setActorPhoto5} id={5} />
            <PhotoBlock selectedFile={actorPhoto6} setSelectedFile={setActorPhoto6} id={6} />
            <div className="admin__movie__section__content__form__actors__input__btn">
              <p>Add new</p>
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </div>
        </div>
        <div className="admin__movie__section__content__form__detalis">
          <div className="admin__movie__section__content__form__detalis__title">
            <h2>Details</h2>
          </div>
          <div className="admin__movie__section__content__form__detalis__block">
            <input type="text" placeholder="Details" />
            <input type="text" placeholder="Language" />
            <input type="text" placeholder="Reliese Date" />
            <input type="text" placeholder="Director" />
          </div>
        </div>
      </div>
    </form>
  );
}

export default Form;
