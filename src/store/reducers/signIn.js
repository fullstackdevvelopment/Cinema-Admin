import { createReducer } from '@reduxjs/toolkit';
import { signIn } from '../actions/signIn';

const initialState = {
  admin: null,
  token: null,
  status: '',
  error: null,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(signIn.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    })
    .addCase(signIn.fulfilled, (state, action) => {
      state.status = 'ok';
      state.admin = action.payload;
      state.token = action.payload.token;
      state.error = null;
    })
    .addCase(signIn.rejected, (state, action) => {
      state.status = 'fail';
      state.admin = null;
      state.token = null;
      state.error = action.payload;
    });
});
