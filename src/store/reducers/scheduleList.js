import { createReducer } from '@reduxjs/toolkit';
import { scheduleList } from '../actions/scheduleList';

const initialState = {
  list: [],
  status: '',
  error: null,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(scheduleList.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    })
    .addCase(scheduleList.fulfilled, (state, action) => {
      state.status = 'ok';
      state.list = action.payload.list;
      state.error = null;
    })
    .addCase(scheduleList.rejected, (state, action) => {
      state.status = 'fail';
      state.list = null;
      state.error = action.payload;
    });
});
