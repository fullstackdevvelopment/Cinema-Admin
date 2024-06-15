import { createReducer } from '@reduxjs/toolkit';
import { userList } from '../actions/userList';

const initialState = {
  list: [],
  status: '',
  error: null,
  totalPages: 1,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(userList.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    })
    .addCase(userList.fulfilled, (state, action) => {
      state.status = 'ok';
      state.list = action.payload.list;
      state.totalPages = action.payload.totalPages;
      state.error = null;
    })
    .addCase(userList.rejected, (state, action) => {
      state.status = 'fail';
      state.list = null;
      state.error = action.payload;
    });
});
