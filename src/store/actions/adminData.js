import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';

export const adminData = createAsyncThunk('admins/adminData', async (thunkAPI) => {
  try {
    const { data } = await Api.adminData();
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
