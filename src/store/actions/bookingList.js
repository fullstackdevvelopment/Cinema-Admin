import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';

export const bookingList = createAsyncThunk('admins/bookingList', async ({ page, limit }, thunkAPI) => {
  try {
    const { data } = await Api.bookingList(page, limit);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
