import React, { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileArrowUp, faFloppyDisk, faPlus, faTriangleExclamation, faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { uniqueId } from 'lodash';
import PropTypes from 'prop-types';
import CreateMovieFileModal from './CreateMovieFileModal';
import CreateTrailerFileModal from './CreateTrailerFileModal';
import CreateStillsFilesModal from './CreateStillsFilesModal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  height: '100%',
  bgcolor: '#000',
  border: '4px solid #135F55',
  outline: 'none',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '50px',
};

function CreateFileModal(props) {
  const {
    files, setFiles, text, stills, setStills, errors,
  } = props;
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addStills = useCallback(() => {
    setStills((prevActors) => {
      const newStills = { id: uniqueId(), photo: '' };
      return [...prevActors, newStills];
    });
  }, [setStills]);

  const handleStillDataChange = useCallback((newStillData) => {
    setStills((prevActors) => prevActors.map((still) => {
      if (still.id === newStillData.id) {
        return {
          ...still,
          photo: newStillData.photo,
        };
      }
      return still;
    }));
  }, [setStills]);

  const handleFileResponse = useCallback((updatedFile) => {
    setFiles((prevFiles) => prevFiles.map((file) => {
      if (file.id === updatedFile.id) {
        return updatedFile;
      }
      return file;
    }));
  }, [setFiles]);

  const handleDeleteStills = useCallback((stillsId) => {
    const updatedStills = stills.filter((still) => still.id !== stillsId);
    setStills(updatedStills);
  }, [stills, setStills]);

  return (
    <div className="modal__files">
      <Button onClick={handleOpen}>
        {text}
        <FontAwesomeIcon icon={faFileArrowUp} />
      </Button>
      {(errors?.files || errors?.stills) ? (
        <div className="error__block">
          <FontAwesomeIcon icon={faTriangleExclamation} />
          {errors?.files ? (
            <span className="files__error">
              {errors.files}
            </span>
          ) : null}
          {errors?.stills ? (
            <span className="stills__error">
              {errors.stills}
            </span>
          ) : null}
        </div>
      ) : null}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div className="modal__files__close">
            <FontAwesomeIcon onClick={handleClose} icon={faXmark} />
          </div>
          <div className="modal__files__block">
            <div className="modal__files__movie">
              <p className="modal__files__movie__title">Movie Photo</p>
              <CreateMovieFileModal
                setFiles={setFiles}
                files={files}
                onFileDataChange={handleFileResponse}
              />
              <CreateTrailerFileModal
                setFiles={setFiles}
                files={files}
                onTrailerDataChange={handleFileResponse}
              />
            </div>
            <div className="modal__files__movie__stills">
              <p className="modal__files__movie__title">Stills Photo</p>
              <div className="modal__files__movie__stills__block">
                {stills && stills.map((still) => (
                  <CreateStillsFilesModal
                    key={still.id}
                    stills={still}
                    onStillsDataChange={handleStillDataChange}
                    onDelete={handleDeleteStills}
                  />
                ))}
              </div>
              {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
              <p className="modal__files__movie__btn" onClick={addStills}>
                Add new
                <FontAwesomeIcon icon={faPlus} />
              </p>
            </div>
          </div>
          <div className="modal__files__save">
            <FontAwesomeIcon onClick={handleClose} icon={faFloppyDisk} />
          </div>
        </Box>
      </Modal>
    </div>
  );
}

CreateFileModal.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      file: PropTypes.object,
    }),
  ).isRequired,
  setFiles: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  stills: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      photo: PropTypes.string,
    }),
  ).isRequired,
  setStills: PropTypes.func.isRequired,
};

export default CreateFileModal;
