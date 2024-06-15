import { createReducer } from '@reduxjs/toolkit';
import { reviewList } from '../actions/reviewList';
import { deleteReview } from '../actions/deleteReview';

const initialState = {
  list: [],
  status: '',
  error: null,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(reviewList.fulfilled, (state, action) => {
      state.status = 'ok';
      state.list = action.payload;
      state.error = null;
    })
    .addCase(deleteReview.fulfilled, (state, action) => {
      state.status = 'ok';
      if (Array.isArray(state.list)) {
        state.list = state.list.filter(
          (comment) => comment.id !== action.payload.deletedCommentId,
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
