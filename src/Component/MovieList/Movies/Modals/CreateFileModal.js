import React, { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileArrowUp, faPlus, faTriangleExclamation, faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { uniqueId } from 'lodash';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import CreateMovieFileModal from './CreateMovieFileModal';
import CreateTrailerFileModal from './CreateTrailerFileModal';
import CreateStillsFilesModal from './CreateStillsFilesModal';
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

function CreateFileModal(props) {
  const {
    files, setFiles, text, stills, setStills, errors,
  } = props;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addStills = useCallback(() => {
    setStills((prevStills) => {
      const newStills = {
        id: uniqueId(), photo: '', selectedFile: null, uploadResult: '',
      };
      return [...prevStills, newStills];
    });
  }, [setStills]);

  const handleStillDataChange = useCallback((newStillData) => {
    setStills((prevStills) => prevStills.map((still) => {
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
      selectedFile: PropTypes.object,
      uploadResult: PropTypes.string,
    }),
  ).isRequired,
  setStills: PropTypes.func.isRequired,
  // eslint-disable-next-line react/require-default-props
  errors: PropTypes.object,
};

export default CreateFileModal;
