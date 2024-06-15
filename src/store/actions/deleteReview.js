import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';
import { reviewList } from './reviewList';

export const deleteReview = createAsyncThunk('admins/deleteReview', async (payload, thunkAPI) => {
  try {
    await Api.deleteReview(payload);
    thunkAPI.dispatch(reviewList({ page: 1, limit: 4 }));
    return payload;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
