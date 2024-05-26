import React, { useState, useEffect } from 'react';
import { ReactComponent as DownloadIcon } from '../../../../assets/icons/download.svg';

function TrailerFile(props) {
  const { addFile, files } = props;
  const [trailerFiles, setTrailerFiles] = useState(files.filter((file) => file.origin === 'trailer'));
  const [selectedTrailer, setSelectedTrailer] = useState(null);

  useEffect(() => {
    setTrailerFiles(files.filter((file) => file.name.startsWith('trailer')));
  }, [files]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedTrailer(file);
    addFile(file, 'trailer');
    setTrailerFiles([...trailerFiles, file]);
  };

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
        </video>
      )}
      {!selectedTrailer && trailerFiles.map((file) => (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video
          key={file}
          className="admin__movie__section__content__form__trailer__video"
          controls
        >
          <source src={URL.createObjectURL(file)} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ))}
    </div>

  );
}

export default TrailerFile;
