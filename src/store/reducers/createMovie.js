import { createReducer } from '@reduxjs/toolkit';
import { createMovie } from '../actions/createMovie';

const initialState = {
  status: '',
  error: null,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(createMovie.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    })
    .addCase(createMovie.fulfilled, (state) => {
      state.status = 'ok';
      state.error = null;
    })
    .addCase(createMovie.rejected, (state, action) => {
      state.status = 'fail';
      state.error = action.payload;
    });
});
