import { createReducer } from '@reduxjs/toolkit';
import { adminData } from '../actions/adminData';

const initialState = {
  admin: {},
  status: '',
  error: null,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(adminData.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    })
    .addCase(adminData.fulfilled, (state, action) => {
      state.status = 'ok';
      state.admin = action.payload.user;
      state.error = null;
    })
    .addCase(adminData.rejected, (state, action) => {
      state.status = 'fail';
      state.admin = null;
      state.error = action.payload;
    });
});
