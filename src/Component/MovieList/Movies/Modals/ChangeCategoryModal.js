import React, { useCallback, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck, faFloppyDisk, faXmark, faTrash, faCheckDouble,
} from '@fortawesome/free-solid-svg-icons';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { categoryList } from '../../../../store/actions/categoryList';
import { createCategory } from '../../../../store/actions/createCategory';
import { deleteCategory } from '../../../../store/actions/deleteCategory';

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

function ChangeCategoryModal(props) {
  const { selectedCategories, setSelectedCategories, text } = props;
  const [open, setOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categoryList.list);
  useEffect(() => {
    dispatch(categoryList());
  }, [dispatch]);

  const handleAddCategory = useCallback(() => {
    dispatch(createCategory({ name: newCategoryName }));
    setNewCategoryName('');
  }, [dispatch, newCategoryName, setNewCategoryName]);

  const handleDeleteCategory = useCallback((categoryId) => {
    dispatch(deleteCategory(categoryId));
  }, [dispatch]);

  const toggleCategorySelection = useCallback((categoryId) => {
    const categoryIdString = categoryId.toString();
    if (selectedCategories.includes(categoryIdString)) {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryIdString));
    } else {
      setSelectedCategories([...selectedCategories, categoryIdString]);
    }
  }, [selectedCategories]);

  return (
    <div className="modal__category">
      <Button onClick={handleOpen}>
        {text}
        <FontAwesomeIcon icon={faCheckDouble} />
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div className="modal__category__close">
            <FontAwesomeIcon onClick={handleClose} icon={faXmark} />
          </div>
          <div className="admin__movie__section__content__cat">
            <div className="admin__movie__section__content__cat__first">
              <div className="admin__movie__section__content__cat__first__input">
                <input
                  type="text"
                  placeholder="Name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
                <FontAwesomeIcon icon={faCheck} onClick={handleAddCategory} />
              </div>
            </div>
            <div className="admin__movie__section__content__cat__list">
              {categories && categories.map((category) => {
                const isSelected = selectedCategories.includes(category.id.toString());
                return (
                  <div key={category.id} onClick={() => toggleCategorySelection(category.id)}>
                    <p>{category.name}</p>
                    {isSelected && <FontAwesomeIcon icon={faCheck} className="check" />}
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={(event) => handleDeleteCategory(category.id, event)}
                    />
                  </div>
                );
              })}

            </div>
          </div>
          <div className="modal__category__save">
            <FontAwesomeIcon onClick={handleClose} icon={faFloppyDisk} />
          </div>
        </Box>
      </Modal>
    </div>
  );
}

ChangeCategoryModal.propTypes = {
  selectedCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedCategories: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default ChangeCategoryModal;
