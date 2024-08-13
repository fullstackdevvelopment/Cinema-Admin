import { createReducer } from '@reduxjs/toolkit';
import { movieLIst } from '../actions/movieList';

const initialState = {
  list: [],
  status: '',
  error: null,
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
      state.error = null;
    })
    .addCase(movieLIst.rejected, (state, action) => {
      state.status = 'fail';
      state.list = null;
      state.error = action.payload;
    });
});
