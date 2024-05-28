import React, {
  useCallback, useState,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { ReactComponent as DownloadIcon } from '../../../assets/icons/download.svg';
import { uploadFile } from '../../../store/actions/uploadFile';

function PhotoBlock({ actor, onActorDataChange }) {
  const [name, setName] = useState(actor.name || '');
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();

  const handleNameChange = useCallback((event) => {
    setName(event.target.value);
  }, []);

  const handleChangeFile = useCallback((event) => {
    setSelectedFile(event.target.files[0]);
  }, []);

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
        console.error('Ошибка загрузки файла:', error);
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
      {selectedFile && (
        <img
          className="admin__movie__section__content__form__actors__input__block__userPhoto"
          src={URL.createObjectURL(selectedFile)}
          alt="Selected"
        />
      )}
      <div
        className="admin__movie__section__content__form__actors__input__block__check"
        onClick={handleUploadFiles}
      >
        <FontAwesomeIcon icon={faCheck} />
      </div>
    </div>
  );
}

export default PhotoBlock;
