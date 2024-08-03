import { createReducer } from '@reduxjs/toolkit';
import { deleteMovie } from '../actions/deleteMovie';
import { movieLIst } from '../actions/movieList';

const initialState = {
  list: [],
  status: '',
  error: null,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(movieLIst.fulfilled, (state, action) => {
      state.status = 'ok';
      state.list = action.payload;
      state.error = null;
    })
    .addCase(deleteMovie.fulfilled, (state, action) => {
      state.status = 'ok';
      if (Array.isArray(state.list)) {
        state.list = state.list.filter(
          (movie) => movie.id !== action.payload.deletedMovieId,
        );
      }
      state.error = null;
    })
    .addMatcher((action) => action.type.endsWith('/pending'), (state) => {
      state.status = 'pending';
      state.error = null;
    })
    .addMatcher((action) => action.type.endsWith('/rejected'), (state, action) => {
      state.status = 'fail';
      state.error = action.error.message;
    });
});
