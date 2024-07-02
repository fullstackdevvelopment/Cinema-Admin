import { createReducer } from '@reduxjs/toolkit';
import { createSchedule } from '../actions/createSchedule';

const initialState = {
  status: '',
  error: null,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(createSchedule.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    })
    .addCase(createSchedule.fulfilled, (state) => {
      state.status = 'ok';
      state.error = null;
    })
    .addCase(createSchedule.rejected, (state, action) => {
      state.status = 'fail';
      state.error = action.payload;
    });
});
