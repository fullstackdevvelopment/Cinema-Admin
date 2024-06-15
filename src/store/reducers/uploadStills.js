import { createReducer } from '@reduxjs/toolkit';
import { uploadStills } from '../actions/uploadStills';

const initialState = {
  file: null,
  status: '',
  error: null,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(uploadStills.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    })
    .addCase(uploadStills.fulfilled, (state, action) => {
      state.status = 'ok';
      state.file = action.payload.stills;
      state.error = null;
    })
    .addCase(uploadStills.rejected, (state, action) => {
      state.status = 'fail';
      state.file = null;
      state.error = action.payload;
    });
});
