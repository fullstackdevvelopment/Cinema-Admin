import React, { useCallback } from 'react';
import { ReactComponent as DownloadIcon } from '../../../assets/icons/download.svg';

function PhotoBlock(props) {
  const { selectedFile, setSelectedFile, id } = props;

  const handleFileChange = useCallback((event) => {
    const file = event.target.files[0];
    setSelectedFile(URL.createObjectURL(file));
  }, []);

  return (
    <div className="admin__movie__section__content__form__actors__input__block">
      <label htmlFor={id}>
        <DownloadIcon />
        {selectedFile && <img className="admin__movie__section__content__form__actors__input__block__userPhoto" src={selectedFile} alt="Selected" />}
      </label>
      <input id={id} type="file" accept="image/*" onChange={handleFileChange} />
      <input type="text" placeholder="Full Name" />
    </div>
  );
}

export default PhotoBlock;
