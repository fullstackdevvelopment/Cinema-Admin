import { createReducer } from '@reduxjs/toolkit';
import { deleteCategory } from '../actions/deleteCategory';
import { categoryList } from '../actions/categoryList';

const initialState = {
  list: [],
  status: '',
  error: null,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(categoryList.fulfilled, (state, action) => {
      state.status = 'ok';
      state.list = action.payload;
      state.error = null;
    })
    .addCase(deleteCategory.fulfilled, (state, action) => {
      state.status = 'ok';
      if (Array.isArray(state.list)) {
        state.list = state.list.filter(
          (category) => category.id !== action.payload.deletedCategoryId,
        );
      }
      state.error = null;
    })
    .addMatcher((action) => action.type.endsWith('/pending'), (state) => {
      state.status = 'pending';
      state.error = null;
    })
    .addMatcher((action) => action.type.endsWith('/rejected'), (state, action) => {
      state.status = 'fail';
      state.error = action.error.message;
    });
});
