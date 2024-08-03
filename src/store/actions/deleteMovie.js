import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';
import { movieLIst } from './movieList';

export const deleteMovie = createAsyncThunk('admins/deleteMovie', async (payload, thunkAPI) => {
  try {
    await Api.deleteMovie(payload);
    thunkAPI.dispatch(movieLIst({ page: 1, limit: 6 }));
    return payload;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
