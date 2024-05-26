import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';

export const categoryList = createAsyncThunk('admins/categoryList', async (payload, thunkAPI) => {
  try {
    const { data } = await Api.getCategoryList();
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
