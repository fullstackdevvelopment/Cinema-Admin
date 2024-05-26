import React, { useState, useEffect } from 'react';
import { ReactComponent as DownloadIcon } from '../../../../assets/icons/download.svg';

function MovieFile(props) {
  const { addFile, files } = props;
  const [movieFiles, setMovieFiles] = useState(files.filter((file) => file.origin === 'moviePhoto'));
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    setMovieFiles(files.filter((file) => file.name.startsWith('moviePhoto')));
  }, [files]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    addFile(file, 'moviePhoto');
    setMovieFiles([...movieFiles, file]);
  };

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
          />
        )}
        {!selectedFile && movieFiles.map((file) => (
          <img
            key={file}
            className="admin__movie__section__content__form__first__input__userPhoto"
            src={URL.createObjectURL(file)}
            alt="Selected"
          />
        ))}
      </label>
    </div>
  );
}

export default MovieFile;
