import { createReducer } from '@reduxjs/toolkit';
import { ticketList } from '../actions/ticketList';

const initialState = {
  list: [],
  status: '',
  error: null,
  totalPages: 1,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(ticketList.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    })
    .addCase(ticketList.fulfilled, (state, action) => {
      state.status = 'ok';
      state.list = action.payload.list;
      state.totalPages = action.payload.totalPages;
      state.error = null;
    })
    .addCase(ticketList.rejected, (state, action) => {
      state.status = 'fail';
      state.list = null;
      state.error = action.payload;
    });
});
