import React, { useCallback, useState, useEffect } from 'react';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactComponent as DownloadIcon } from '../../../../assets/icons/download.svg';
import errorImg from '../../../../assets/images/error.png';

function ChangeStillsFilesModal(props) {
  const {
    stills, onDelete, selectedStill, setSelectedStill, onFileChange,
  } = props;
  const [selectedFile, setSelectedFile] = useState(selectedStill || null);
  useEffect(() => {
    if (selectedStill) {
      setSelectedFile(selectedStill);
    }
  }, [selectedStill]);

  const handleDelete = useCallback(() => {
    onDelete(stills.id);
    setSelectedFile(null);
  }, [onDelete, stills, setSelectedFile]);

  const handleFileChange = useCallback((event) => {
    const file = event.target.files[0];
    onFileChange(stills.id, file);
    setSelectedFile(file);
    setSelectedStill(file);
  }, [onFileChange, stills.id]);

  return (
    <div className="admin__movie__section__content__form__movie__stills">
      <label htmlFor={`still-input-${stills.id}`}>
        <input id={`still-input-${stills.id}`} type="file" accept="image/*" onChange={handleFileChange} />
        Stills
        <DownloadIcon />
        {selectedFile ? (
          <img
            className="admin__movie__section__content__form__first__input__userPhoto"
            src={URL.createObjectURL(selectedFile)}
            alt="Selected"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = errorImg;
            }}
          />
        ) : null}
        {!selectedFile && stills.stillPath ? (
          <img
            className="admin__movie__section__content__form__first__input__userPhoto"
            src={`http://localhost:4000/${stills.stillPath}`}
            alt="Selected"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = errorImg;
            }}
          />
        ) : null}
      </label>
      <div>
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
        <FontAwesomeIcon className="stills__xmark" icon={faXmark} onClick={handleDelete} />
      </div>
    </div>
  );
}

export default ChangeStillsFilesModal;
