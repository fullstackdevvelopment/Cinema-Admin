import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';

export const uploadTrailer = createAsyncThunk('admins/uploadTrailer', async (payload, thunkAPI) => {
  try {
    const { data } = await Api.uploadTrailer(payload);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
