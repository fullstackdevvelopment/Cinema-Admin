import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';

export const userList = createAsyncThunk('admins/userList', async ({ page, limit }, thunkAPI) => {
  try {
    const { data } = await Api.userList(page, limit);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
