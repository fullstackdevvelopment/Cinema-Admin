import { createReducer } from '@reduxjs/toolkit';
import { bookingList } from '../actions/bookingList';

const initialState = {
  list: [],
  status: '',
  error: null,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(bookingList.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    })
    .addCase(bookingList.fulfilled, (state, action) => {
      state.status = 'ok';
      state.list = action.payload;
      state.error = null;
    })
    .addCase(bookingList.rejected, (state, action) => {
      state.status = 'fail';
      state.list = null;
      state.error = action.payload;
    });
});
