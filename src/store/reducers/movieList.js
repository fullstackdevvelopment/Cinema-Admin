import { createReducer } from '@reduxjs/toolkit';
import { movieLIst } from '../actions/movieList';

const initialState = {
  list: [],
  status: '',
  error: null,
  totalPages: 1,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(movieLIst.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    })
    .addCase(movieLIst.fulfilled, (state, action) => {
      state.status = 'ok';
      state.list = action.payload.list;
      state.totalPages = action.payload.totalPages;
      state.error = null;
    })
    .addCase(movieLIst.rejected, (state, action) => {
      state.status = 'fail';
      state.list = null;
      state.error = action.payload;
    });
});
