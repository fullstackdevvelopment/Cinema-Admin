import React, { useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { ReactComponent as DownloadIcon } from '../../../assets/icons/download.svg';
import errorImg from '../../../assets/images/error.png';

function PhotoBlock(props) {
  const {
    actor, onActorDataChange, onDelete,
  } = props;
  const [name, setName] = useState(actor.name || '');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleNameChange = useCallback((event) => {
    const newName = event.target.value;
    setName(newName);
    onActorDataChange({
      id: actor.id,
      name: newName,
    });
  }, [actor.id, onActorDataChange]);

  const handleChangeFile = useCallback((event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    onActorDataChange({
      id: actor.id,
      selectedFile: file,
    });
  }, [actor.id, onActorDataChange]);

  const handleDelete = useCallback(() => {
    onDelete(actor.id);
  }, [onDelete, actor]);

  return (
    <div className="admin__movie__section__content__form__actors__input__block">
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={handleNameChange}
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor={`file-input-${actor.id}`}>
        <DownloadIcon />
        <input
          id={`file-input-${actor.id}`}
          type="file"
          accept="image/*"
          onChange={handleChangeFile}
        />
      </label>
      {selectedFile ? (
        <img
          className="admin__movie__section__content__form__actors__input__block__userPhoto"
          src={URL.createObjectURL(selectedFile)}
          alt="Selected"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = errorImg;
          }}
        />
      ) : null}
      {actor.photo ? (
        <img
          className="admin__movie__section__content__form__actors__input__block__userPhoto"
          src={`http://localhost:4000/${actor.photo}`}
          alt="Selected"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = errorImg;
          }}
        />
      ) : null}
      <div className="admin__movie__section__content__form__actors__input__block__check">
        <span onClick={handleDelete}>
          Delete
          <FontAwesomeIcon className="stills__xmark__actor" icon={faXmark} />
        </span>
        {/* eslint-disable-next-line no-nested-ternary */}
        {actor.uploadResult === 'ok' ? (
          <span className="ok">
            <FontAwesomeIcon icon={faCheck} />
          </span>
        ) : actor.uploadResult === 'fail' ? (
          <span className="fail">
            <FontAwesomeIcon icon={faXmark} />
          </span>
        ) : null}
      </div>
    </div>
  );
}

PhotoBlock.propTypes = {
  actor: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    photo: PropTypes.string,
  }).isRequired,
  onActorDataChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PhotoBlock;
