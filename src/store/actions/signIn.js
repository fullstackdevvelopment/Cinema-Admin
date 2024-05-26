import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';

export const signIn = createAsyncThunk('admins/login', async (payload, thunkAPI) => {
  try {
    const { data } = await Api.login(payload);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
