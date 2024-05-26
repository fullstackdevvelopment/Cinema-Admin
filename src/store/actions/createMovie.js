import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';

export const createMovie = createAsyncThunk('movie/createMovie', async (payload, thunkAPI) => {
  try {
    const { data } = await Api.createMovie(payload);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
