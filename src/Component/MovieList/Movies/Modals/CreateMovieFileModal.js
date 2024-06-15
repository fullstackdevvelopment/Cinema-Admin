import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { uniqueId } from 'lodash';
import { ReactComponent as DownloadIcon } from '../../../../assets/icons/download.svg';
import { uploadPhoto } from '../../../../store/actions/uploadPhoto';
import errorImg from '../../../../assets/images/error.png';

function CreateMovieFileModal(props) {
  const {
    addFile, files, onFileDataChange,
  } = props;
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentFileId, setCurrentFileId] = useState(null);
  const [movieFile] = useState(files.find((file) => file.photo?.endsWith('.webp'))
  || files.find((file) => file.photo?.endsWith('.png'))
  || files.find((file) => file.photo?.endsWith('.jpg')));

  useEffect(() => {
    if (files.length > 0) {
      const photoFile = files.find((file) => file.file?.type?.startsWith('image/'));
      setCurrentFileId(photoFile?.id);
    }
  }, [files]);

  const handleFileChange = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const fileId = currentFileId || uniqueId();
      setCurrentFileId(fileId);
      addFile({ id: fileId, file });
    }
  }, [setSelectedFile, currentFileId, setCurrentFileId, addFile]);

  const uploadPhotos = useCallback(async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await dispatch(uploadPhoto(formData));
        onFileDataChange({
          id: currentFileId,
          photo: response.payload.photo.photo,
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, [dispatch, selectedFile, onFileDataChange, currentFileId]);

  return (
    <div className="admin__movie__section__content__form__movie">
      <label htmlFor="file">
        <input id="file" type="file" accept="image/*" onChange={handleFileChange} />
        Photo
        <DownloadIcon />
        {selectedFile && (
          <img
            className="admin__movie__section__content__form__first__input__userPhoto"
            src={URL.createObjectURL(selectedFile)}
            alt="Selected"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = errorImg;
            }}
          />
        )}
        {movieFile ? (
          <img
            className="admin__movie__section__content__form__first__input__userPhoto"
            src={`http://localhost:4000/${movieFile.photo}`}
            alt="Selected"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = errorImg;
            }}
          />
        ) : null}
      </label>
      <div className="admin__movie__section__content__form__movie__btn" onClick={uploadPhotos}>
        <p>Upload</p>
      </div>
    </div>
  );
}

export default CreateMovieFileModal;
