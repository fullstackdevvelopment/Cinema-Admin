import React, {
  useCallback, useState,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { ReactComponent as DownloadIcon } from '../../../assets/icons/download.svg';
import { uploadFile } from '../../../store/actions/uploadFile';
import errorImg from '../../../assets/images/error.png';

function PhotoBlock(props) {
  const { actor, onActorDataChange, onDelete } = props;
  const [name, setName] = useState(actor.name || '');
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();

  const handleDelete = useCallback(() => {
    onDelete(actor.id);
  }, [onDelete, actor]);

  const handleNameChange = useCallback((event) => {
    setName(event.target.value);
  }, [setName]);

  const handleChangeFile = useCallback((event) => {
    setSelectedFile(event.target.files[0]);
  }, [setSelectedFile]);

  const handleUploadFiles = useCallback(async () => {
    if (selectedFile && name) {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('file', selectedFile);

      try {
        const response = await dispatch(uploadFile(formData));
        onActorDataChange({
          id: actor.id,
          name: response.payload.actor.name,
          photo: response.payload.actor.photo,
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, [dispatch, selectedFile, name, actor.id, onActorDataChange]);
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
      <div
        className="admin__movie__section__content__form__actors__input__block__check"
        onClick={handleUploadFiles}
      >
        <FontAwesomeIcon icon={faCheck} />
        <FontAwesomeIcon className="stills__xmark__actor" icon={faXmark} onClick={handleDelete} />
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
