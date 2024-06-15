import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ReactComponent as DownloadIcon } from '../../../../assets/icons/download.svg';
import { uploadStills } from '../../../../store/actions/uploadStills';
import errorImg from '../../../../assets/images/error.png';

function CreateStillsFilesModal(props) {
  const { stills, onStillsDataChange } = props;
  const dispatch = useDispatch();
  const [localState, setLocalState] = useState({
    selectedFile: null,
  });

  const handleFileChange = useCallback((event) => {
    const file = event.target.files[0];
    setLocalState((prevState) => ({
      ...prevState,
      selectedFile: file,
    }));
  }, [setLocalState]);

  const uploadStill = useCallback(async () => {
    const { selectedFile } = localState;
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await dispatch(uploadStills(formData));
        onStillsDataChange({
          id: stills.id,
          photo: response.payload.stills.photo,
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, [dispatch, localState, stills, onStillsDataChange]);

  return (
    <div className="admin__movie__section__content__form__movie__stills">
      <label htmlFor={`still-input-${stills.id}`}>
        <input id={`still-input-${stills.id}`} type="file" accept="image/*" onChange={handleFileChange} />
        Stills
        <DownloadIcon />
        {localState.selectedFile && (
          <img
            className="admin__movie__section__content__form__first__input__userPhoto"
            src={URL.createObjectURL(localState.selectedFile)}
            alt="Selected"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = errorImg;
            }}
          />
        )}
        {stills && stills.photo ? (
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
      <div onClick={uploadStill}>
        <p>Upload</p>
      </div>
    </div>
  );
}

export default CreateStillsFilesModal;
