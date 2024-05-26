import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileArrowUp, faXmark, faFloppyDisk,
} from '@fortawesome/free-solid-svg-icons';
import MovieFile from './MovieFile';
import TrailerFile from './TrailerFile';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1200,
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

function ModalFiles(props) {
  const { files, setFiles } = props;
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addFile = (file) => {
    setFiles((prevFiles) => [...prevFiles, file]);
  };

  return (
    <div className="modal__files">
      <Button onClick={handleOpen}>
        Upload Files For Movie
        <FontAwesomeIcon icon={faFileArrowUp} />
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div className="modal__files__close">
            <FontAwesomeIcon onClick={handleClose} icon={faXmark} />
          </div>
          <div className="modal__files__block">
            <div className="modal__files__movie">
              <p className="modal__files__movie__title">Movie Photo</p>
              <MovieFile addFile={addFile} files={files} />
            </div>
          </div>
          <TrailerFile addFile={addFile} files={files} />
          <div className="modal__files__save">
            <FontAwesomeIcon onClick={handleClose} icon={faFloppyDisk} />
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalFiles;
