import React, { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileArrowUp, faPlus, faTriangleExclamation, faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { uniqueId } from 'lodash';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import ChangeMovieFileModal from './ChangeMovieFileModal';
import ChangeTrailerFileModal from './ChangeTrailerFileModal';
import ChangeStillsFilesModal from './ChangeStillsFilesModal';
import { uploadStills } from '../../../../store/actions/uploadStills';

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

function ChangeFileModal(props) {
  const {
    files, setFiles, text, stills, setStills, errors,
  } = props;
  const { movieId } = useParams();
  const [open, setOpen] = useState(false);
  const [selectedStill, setSelectedStill] = useState({});
  const dispatch = useDispatch();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addFile = useCallback((file) => {
    setFiles((prevFiles) => [...prevFiles, file]);
  }, [setFiles]);

  const addStills = useCallback(() => {
    setStills((prevActors) => {
      const newStills = { id: Number(uniqueId()), stillPath: '', movieId: Number(movieId) };
      return [...prevActors, newStills];
    });
  }, [setStills]);

  const handleStillDataChange = useCallback((newStillData) => {
    setStills((prevActors) => prevActors.map((still) => {
      if (still.id === newStillData.id) {
        return {
          id: newStillData.id,
          stillPath: newStillData.photo,
          movieId: Number(movieId),
        };
      }
      return still;
    }));
  }, [setStills]);

  const handleDeleteStills = useCallback((stillsId) => {
    const updatedStills = stills.filter((still) => still.id !== stillsId);
    setStills(updatedStills);

    setSelectedStill((prev) => {
      const newSelected = { ...prev };
      delete newSelected[stillsId];
      return newSelected;
    });
  }, [stills, setStills, setSelectedStill]);

  const handleDeleteFiles = useCallback((filesId) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== filesId));
  }, [setFiles]);

  const handleSelectStill = useCallback((stillId, file) => {
    setSelectedStill((prev) => ({ ...prev, [stillId]: file }));
  }, [setSelectedStill]);

  const handleFileResponse = useCallback((updatedFile) => {
    setFiles((prevFiles) => prevFiles.map((file) => {
      if (file.id === updatedFile.id) {
        return updatedFile;
      }
      return file;
    }));
  }, [setFiles]);

  const setUploadResult = useCallback((id, result) => {
    setStills((prevStills) => prevStills.map((still) => {
      if (still.id === id) {
        return {
          ...still,
          uploadResult: result,
        };
      }
      return still;
    }));
  }, [setStills]);

  const handleSelectedFileChange = useCallback((id, file) => {
    setStills((prevStills) => prevStills.map((still) => {
      if (still.id === id) {
        return {
          ...still,
          selectedFile: file,
          uploadResult: '',
        };
      }
      return still;
    }));
  }, [setStills]);

  const uploadAllStills = useCallback(async () => {
    // eslint-disable-next-line no-restricted-syntax
    for (const still of stills) {
      if (still.selectedFile) {
        const formData = new FormData();
        formData.append('file', still.selectedFile);

        try {
          // eslint-disable-next-line no-await-in-loop
          const uploadStillsResult = await dispatch(uploadStills(formData));
          if (uploadStills.fulfilled.match(uploadStillsResult)) {
            handleStillDataChange({
              id: still.id,
              photo: uploadStillsResult.payload.stills.photo,
            });
            setUploadResult(still.id, 'ok');
          } else {
            console.error('Upload failed for still:', still.id);
            setUploadResult(still.id, 'fail');
          }
        } catch (error) {
          console.error('Error uploading still:', still.id, error);
          setUploadResult(still.id, 'fail');
        }
      }
    }
  }, [dispatch, stills, handleStillDataChange, setUploadResult]);

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
              <ChangeMovieFileModal
                addFile={addFile}
                files={files}
                onDelete={handleDeleteFiles}
                onFileDataChange={handleFileResponse}
              />
              <ChangeTrailerFileModal
                addFile={addFile}
                files={files}
                onDelete={handleDeleteFiles}
                onTrailerDataChange={handleFileResponse}
              />
            </div>
            <div className="modal__files__movie__stills">
              <p className="modal__files__movie__title">Stills Photo</p>
              <div className="modal__files__movie__stills__block">
                {stills && stills.map((still) => (
                  <ChangeStillsFilesModal
                    key={still.id}
                    stills={still}
                    onDelete={handleDeleteStills}
                    selectedStill={selectedStill[still.id]}
                    setSelectedStill={(file) => handleSelectStill(still.id, file)}
                    onFileChange={handleSelectedFileChange}
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
            <Button onClick={uploadAllStills}>
              Upload Stills
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

ChangeFileModal.propTypes = {
  files: PropTypes.arrayOf(PropTypes.object).isRequired,
  setFiles: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  stills: PropTypes.arrayOf(PropTypes.object).isRequired,
  setStills: PropTypes.func.isRequired,
};

export default ChangeFileModal;
