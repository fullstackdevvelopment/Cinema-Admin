import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';

export const uploadStills = createAsyncThunk('admins/uploadStills', async (payload, thunkAPI) => {
  try {
    const { data } = await Api.uploadStills(payload);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
