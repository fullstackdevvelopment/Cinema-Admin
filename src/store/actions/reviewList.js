import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';

export const reviewList = createAsyncThunk('admins/reviewList', async ({ page, limit }, thunkAPI) => {
  try {
    const { data } = await Api.reviewList(page, limit);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
