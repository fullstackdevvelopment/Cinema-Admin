import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';

export const bookingList = createAsyncThunk('admins/bookingList', async (payload, thunkAPI) => {
  try {
    const { data } = await Api.bookingList();
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
