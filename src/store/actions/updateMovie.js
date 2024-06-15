import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';

export const updateMovie = createAsyncThunk('movie/updateMovie', async ({ formData, movieId }, thunkAPI) => {
  try {
    const { data } = await Api.updateMovie({ formData, movieId });
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
