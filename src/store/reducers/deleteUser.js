import { createReducer } from '@reduxjs/toolkit';
import { deleteUser } from '../actions/deleteUser';

const initialState = {
  list: [],
  status: '',
  error: null,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(deleteUser.fulfilled, (state, action) => {
      state.status = 'ok';
      state.list = action.payload;
      state.error = null;
    })
    .addCase(deleteUser.fulfilled, (state, action) => {
      state.status = 'ok';
      if (Array.isArray(state.list)) {
        state.list = state.list.filter(
          (user) => user.id !== action.payload.deletedUserId,
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
