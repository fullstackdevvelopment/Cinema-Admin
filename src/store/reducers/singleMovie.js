import { createReducer } from '@reduxjs/toolkit';
import { singleMovie } from '../actions/singleMovie';

const initialState = {
  list: [],
  status: '',
  error: null,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(singleMovie.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    })
    .addCase(singleMovie.fulfilled, (state, action) => {
      state.status = 'ok';
      state.list = action.payload;
      state.error = null;
    })
    .addCase(singleMovie.rejected, (state, action) => {
      state.status = 'fail';
      state.list = null;
      state.error = action.payload;
    });
});
