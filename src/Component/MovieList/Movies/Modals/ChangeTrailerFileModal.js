import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { uniqueId } from 'lodash';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ReactComponent as DownloadIcon } from '../../../../assets/icons/download.svg';
import { uploadTrailer } from '../../../../store/actions/uploadTrailer';
import videoError from '../../../../assets/images/videoError.jpg';

function ChangeTrailerFileModal(props) {
  const {
    addFile, files, onDelete, onTrailerDataChange,
  } = props;
  const dispatch = useDispatch();
  const { movieId } = useParams();
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const [currentFileId, setCurrentFileId] = useState(null);
  const [trailerFile, setTrailerFile] = useState(null);

  const handleDelete = useCallback(() => {
    const trailerFileToDelete = files.find((file) => file.trailer && file.trailer?.endsWith('.mp4'));
    if (trailerFileToDelete) {
      onDelete(trailerFileToDelete.id);
    }
    if (trailerFile) {
      onDelete(trailerFile.id);
      setTrailerFile(null);
    }
  }, [onDelete, trailerFile, setTrailerFile, files]);

  useEffect(() => {
    if (files.length > 0) {
      const videoFile = files.find((file) => file.file?.type?.startsWith('video/'));
      setCurrentFileId(videoFile?.id);
    }
    setTrailerFile(files.find((file) => file.trailer?.endsWith('.mp4')));
  }, [files]);

  const handleFileChange = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedTrailer(file);
      const fileId = currentFileId || uniqueId();
      setCurrentFileId(fileId);
      addFile({ id: fileId, file });
    }
  }, [currentFileId, addFile]);

  const uploadTrailers = useCallback(async () => {
    if (selectedTrailer) {
      const formData = new FormData();
      formData.append('file', selectedTrailer);

      try {
        const response = await dispatch(uploadTrailer(formData));
        onTrailerDataChange({
          id: currentFileId,
          movieId: Number(movieId),
          trailer: response.payload.trailer.trailer,
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, [dispatch, selectedTrailer, onTrailerDataChange, currentFileId]);

  return (
    <div className="admin__movie__section__content__form__trailer">
      <label htmlFor="trailer">
        Trailer
        <DownloadIcon />
        <input id="trailer" type="file" accept="video/*" onChange={handleFileChange} />
      </label>
      {selectedTrailer ? (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video className="admin__movie__section__content__form__trailer__video" controls>
          <source src={URL.createObjectURL(selectedTrailer)} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : null}
      {!selectedTrailer && trailerFile ? (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video
          className="admin__movie__section__content__form__trailer__video"
          controls
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = videoError;
          }}
        >
          <source src={`http://localhost:4000/${trailerFile?.trailer}`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : null}
      <div className="admin__movie__section__content__form__movie__delete" onClick={handleDelete}>
        <p>Delete Trailer</p>
        <FontAwesomeIcon icon={faXmark} />
      </div>
      <div className="admin__movie__section__content__form__movie__btn" onClick={uploadTrailers}>
        <p>Upload</p>
      </div>
    </div>
  );
}

export default ChangeTrailerFileModal;
