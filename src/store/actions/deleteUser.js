import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';
import { userList } from './userList';

export const deleteUser = createAsyncThunk('admins/deleteUser', async (payload, thunkAPI) => {
  try {
    await Api.deleteUser(payload);
    thunkAPI.dispatch(userList({ page: 1, limit: 6 }));
    return payload;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
