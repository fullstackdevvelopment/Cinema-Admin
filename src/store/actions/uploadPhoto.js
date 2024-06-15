import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';

export const uploadPhoto = createAsyncThunk('admins/uploadPhoto', async (payload, thunkAPI) => {
  try {
    const { data } = await Api.uploadPhoto(payload);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
