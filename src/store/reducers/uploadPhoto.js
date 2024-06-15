import { createReducer } from '@reduxjs/toolkit';
import { uploadPhoto } from '../actions/uploadPhoto';

const initialState = {
  file: null,
  status: '',
  error: null,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(uploadPhoto.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    })
    .addCase(uploadPhoto.fulfilled, (state, action) => {
      state.status = 'ok';
      state.file = action.payload.photo;
      state.error = null;
    })
    .addCase(uploadPhoto.rejected, (state, action) => {
      state.status = 'fail';
      state.file = null;
      state.error = action.payload;
    });
});
