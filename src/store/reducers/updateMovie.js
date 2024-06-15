import { createReducer } from '@reduxjs/toolkit';
import { updateMovie } from '../actions/updateMovie';

const initialState = {
  status: '',
  error: null,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(updateMovie.pending, (payload, state) => {
      state.status = 'pending';
      state.error = null;
    })
    .addCase(updateMovie.fulfilled, (state) => {
      state.status = 'ok';
      state.error = null;
    })
    .addCase(updateMovie.rejected, (state, action) => {
      state.status = 'fail';
      state.error = action.payload;
    });
});
