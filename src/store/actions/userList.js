import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';

export const userList = createAsyncThunk('admins/userList', async (payload, thunkAPI) => {
  try {
    const { data } = await Api.userList();
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
