import { createReducer } from '@reduxjs/toolkit';
import { categoryList } from '../actions/categoryList';

const initialState = {
  list: [],
  status: '',
  error: null,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(categoryList.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    })
    .addCase(categoryList.fulfilled, (state, action) => {
      state.status = 'ok';
      state.list = action.payload.list;
      state.error = null;
    })
    .addCase(categoryList.rejected, (state, action) => {
      state.status = 'fail';
      state.list = null;
      state.error = action.payload;
    });
});
