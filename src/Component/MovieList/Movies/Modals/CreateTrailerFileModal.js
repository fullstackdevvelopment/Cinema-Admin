import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { uniqueId } from 'lodash';
import { ReactComponent as DownloadIcon } from '../../../../assets/icons/download.svg';
import { uploadTrailer } from '../../../../store/actions/uploadTrailer';
import videoError from '../../../../assets/images/videoError.jpg';

function CreateTrailerFileModal(props) {
  const { addFile, files, onTrailerDataChange } = props;
  const dispatch = useDispatch();
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const [currentFileId, setCurrentFileId] = useState(null);
  const [trailerFile] = useState(files.find((file) => file.trailer?.endsWith('.mp4')));

  useEffect(() => {
    if (files.length > 0) {
      const videoFile = files?.find((file) => file.file?.type?.startsWith('video/'));
      setCurrentFileId(videoFile?.id);
    }
  }, [files]);

  const handleFileChange = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedTrailer(file);
      const fileId = currentFileId || uniqueId();
      setCurrentFileId(fileId);
      addFile({ id: fileId, file });
    }
  }, [setSelectedTrailer, currentFileId, setCurrentFileId, addFile]);

  const uploadTrailers = useCallback(async () => {
    if (selectedTrailer) {
      const formData = new FormData();
      formData.append('file', selectedTrailer);

      try {
        const response = await dispatch(uploadTrailer(formData));
        onTrailerDataChange({
          id: currentFileId,
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
      {selectedTrailer && (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video className="admin__movie__section__content__form__trailer__video" controls>
          <source src={URL.createObjectURL(selectedTrailer)} type="video/mp4" />
          Your browser does not support the video tag.
          onError=
          {(e) => {
            e.target.onerror = null;
            e.target.src = videoError;
          }}
        </video>
      )}
      {trailerFile ? (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video
          className="admin__movie__section__content__form__trailer__video"
          controls
        >
          <source src={`http://localhost:4000/${trailerFile.trailer}`} type="video/mp4" />
          Your browser does not support the video tag.
          onError=
          {(e) => {
            e.target.onerror = null;
            e.target.src = videoError;
          }}
        </video>
      ) : null}
      <div className="admin__movie__section__content__form__movie__btn" onClick={uploadTrailers}>
        <p>Upload</p>
      </div>
    </div>
  );
}

export default CreateTrailerFileModal;
