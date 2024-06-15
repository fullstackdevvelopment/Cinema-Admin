import { createReducer } from '@reduxjs/toolkit';
import { uploadTrailer } from '../actions/uploadTrailer';

const initialState = {
  file: null,
  status: '',
  error: null,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(uploadTrailer.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    })
    .addCase(uploadTrailer.fulfilled, (state, action) => {
      state.status = 'ok';
      state.file = action.payload.trailer;
      state.error = null;
    })
    .addCase(uploadTrailer.rejected, (state, action) => {
      state.status = 'fail';
      state.file = null;
      state.error = action.payload;
    });
});
