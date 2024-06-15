import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';

export const singleMovie = createAsyncThunk('admins/singleMovie', async (payload, thunkAPI) => {
  try {
    const { data } = await Api.getSingleMovie(payload);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
