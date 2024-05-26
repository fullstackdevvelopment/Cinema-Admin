import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';

export const uploadFile = createAsyncThunk('admins/uploadFile', async (payload, thunkAPI) => {
  try {
    const { data } = await Api.uploadFile(payload);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
