import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { uniqueId } from 'lodash';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ReactComponent as DownloadIcon } from '../../../../assets/icons/download.svg';
import { uploadPhoto } from '../../../../store/actions/uploadPhoto';
import errorImg from '../../../../assets/images/error.png';

function ChangeMovieFileModal(props) {
  const {
    addFile, files, onDelete, onFileDataChange,
  } = props;
  const dispatch = useDispatch();
  const { movieId } = useParams();
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentFileId, setCurrentFileId] = useState(null);
  const [movieFile, setMovieFile] = useState(null);
  const [uploadResult, setUploadResult] = useState('');

  const handleDelete = useCallback(() => {
    const movieFileToDelete = files.find(
      (file) => file.moviePhoto && (file.moviePhoto.endsWith('.png')
        || file.moviePhoto.endsWith('.jpg') || file.moviePhoto.endsWith('.webp') || file.moviePhoto.endsWith('.jpeg')),
    );
    if (movieFileToDelete) {
      onDelete(movieFileToDelete.id);
    }
    if (movieFile) {
      onDelete(movieFile.id);
      setMovieFile(null);
    }
  }, [onDelete, setMovieFile, movieFile, files]);

  useEffect(() => {
    if (files.length > 0) {
      const photoFile = files.find((file) => file.file?.type?.startsWith('image/'));
      setCurrentFileId(photoFile?.id);
    }
    setMovieFile(files.find((file) => file.moviePhoto?.endsWith('.webp'))
      || files.find((file) => file.moviePhoto?.endsWith('.png'))
      || files.find((file) => file.moviePhoto?.endsWith('.jpg')));
  }, [files]);

  const handleFileChange = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const fileId = currentFileId || uniqueId();
      setCurrentFileId(fileId);
      addFile({ id: fileId, file });
    }
  }, [currentFileId, addFile]);

  const uploadPhotos = useCallback(async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const uploadPhotoResult = await dispatch(uploadPhoto(formData));
        if (uploadPhoto.fulfilled.match(uploadPhotoResult)) {
          setUploadResult('ok');
          onFileDataChange({
            id: currentFileId,
            movieId: Number(movieId),
            moviePhoto: uploadPhotoResult.payload.photo.photo,
          });
        } else {
          setUploadResult('fail');
        }
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
        {!selectedFile && movieFile ? (
          <img
            className="admin__movie__section__content__form__first__input__userPhoto"
            src={`http://localhost:4000/${movieFile?.moviePhoto}`}
            alt="Selected"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = errorImg;
            }}
          />
        ) : null}
      </label>
      <div className="admin__movie__section__content__form__movie__delete" onClick={handleDelete}>
        <p>Delete Image</p>
        <FontAwesomeIcon icon={faXmark} />
      </div>
      <div className="admin__movie__section__content__form__movie__btn" onClick={uploadPhotos}>
        <p>Upload</p>
        {/* eslint-disable-next-line no-nested-ternary */}
        {uploadResult === 'ok' ? (
          <span className="ok">
            <FontAwesomeIcon icon={faCheck} />
          </span>
        ) : uploadResult === 'fail' ? (
          <span className="fail">
            <FontAwesomeIcon icon={faXmark} />
          </span>
        ) : null}
      </div>
    </div>
  );
}

export default ChangeMovieFileModal;
