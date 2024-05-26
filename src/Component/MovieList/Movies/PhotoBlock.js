import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as DownloadIcon } from '../../../assets/icons/download.svg';
import { uploadFile } from '../../../store/actions/uploadFile';

function PhotoBlock(props) {
  const { actor, onActorChange } = props;
  const [name, setName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();
  const actorData = useSelector((state) => state.uploadFile.file);
  const prevActorDataRef = useRef();

  const handleNameChange = useCallback((event) => {
    const newName = event.target.value;
    setName(newName);
  }, []);

  const handleChangeFile = useCallback((event) => {
    const newFile = event.target.files[0];
    setSelectedFile(newFile);
  }, []);

  const handleUploadFiles = useCallback(() => {
    if (selectedFile !== null && name !== '') {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('file', selectedFile);
      dispatch(uploadFile(formData));
    }
  }, [name, selectedFile, dispatch]);

  useEffect(() => {
    if (actorData !== null && prevActorDataRef.current !== actorData) {
      const updatedActor = {
        ...actor,
        name: actorData.name,
        photo: actorData.photo,
      };
      onActorChange(actor.id, updatedActor);
      prevActorDataRef.current = actorData;
      console.log(updatedActor);
    }
  }, [actorData, actor, onActorChange]);

  return (
    <div className="admin__movie__section__content__form__actors__input__block">
      <input type="text" placeholder="Full Name" value={name} onChange={handleNameChange} />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor={`file-input-${actor.id}`}>
        <DownloadIcon />
        <input id={`file-input-${actor.id}`} type="file" accept="image/*" onChange={handleChangeFile} />
      </label>
      {selectedFile && (
        <img
          className="admin__movie__section__content__form__actors__input__block__userPhoto"
          src={URL.createObjectURL(selectedFile)}
          alt="Selected"
        />
      )}
      <div className="admin__movie__section__content__form__actors__input__block__check">
        <FontAwesomeIcon icon={faCheck} onClick={handleUploadFiles} />
      </div>
    </div>
  );
}

export default PhotoBlock;
