import { createReducer } from '@reduxjs/toolkit';
import { uploadFile } from '../actions/uploadFile';

const initialState = {
  file: null,
  status: '',
  error: null,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(uploadFile.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    })
    .addCase(uploadFile.fulfilled, (state, action) => {
      state.status = 'ok';
      state.file = action.payload.actor;
      state.error = null;
    })
    .addCase(uploadFile.rejected, (state, action) => {
      state.status = 'fail';
      state.file = null;
      state.error = action.payload;
    });
});
