import React, { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as DownloadIcon } from '../../../../assets/icons/download.svg';
import errorImg from '../../../../assets/images/error.png';

function CreateStillsFilesModal(props) {
  const {
    stills, onDelete, onFileChange,
  } = props;

  const handleFileChange = useCallback((event) => {
    const file = event.target.files[0];
    onFileChange(stills.id, file);
  }, [onFileChange, stills.id]);

  const handleDelete = useCallback(() => {
    onDelete(stills.id);
  }, [onDelete, stills]);

  return (
    <div className="admin__movie__section__content__form__movie__stills">
      <label htmlFor={`still-input-${stills.id}`}>
        <input
          id={`still-input-${stills.id}`}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        Stills
        <DownloadIcon />
        {stills.selectedFile && (
          <img
            className="admin__movie__section__content__form__first__input__userPhoto"
            src={URL.createObjectURL(stills.selectedFile)}
            alt="Selected"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = errorImg;
            }}
          />
        )}
        {stills.photo ? (
          <img
            className="admin__movie__section__content__form__first__input__userPhoto"
            src={`http://localhost:4000/${stills.photo}`}
            alt="Selected"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = errorImg;
            }}
          />
        ) : null}
      </label>
      <div>
        <FontAwesomeIcon className="stills__xmark" icon={faXmark} onClick={handleDelete} />
        {/* eslint-disable-next-line no-nested-ternary */}
        {stills.uploadResult === 'ok' ? (
          <span className="ok">
            <FontAwesomeIcon icon={faCheck} />
          </span>
        ) : stills.uploadResult === 'fail' ? (
          <span className="fail">
            <FontAwesomeIcon icon={faXmark} />
          </span>
        ) : null}
      </div>
    </div>
  );
}

export default CreateStillsFilesModal;
