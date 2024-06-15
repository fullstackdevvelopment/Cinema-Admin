import { createReducer } from '@reduxjs/toolkit';
import { createCategory } from '../actions/createCategory';

const initialState = {
  status: '',
  error: null,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(createCategory.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    })
    .addCase(createCategory.fulfilled, (state) => {
      state.status = 'ok';
      state.error = null;
    })
    .addCase(createCategory.rejected, (state, action) => {
      state.status = 'fail';
      state.error = action.error.message;
    });
});
