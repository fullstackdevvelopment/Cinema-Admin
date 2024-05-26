import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';

export const movieLIst = createAsyncThunk('admins/movieLIst', async (payload, thunkAPI) => {
  try {
    const { data } = await Api.movieList();
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
