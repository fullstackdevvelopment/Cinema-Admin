import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';
import { categoryList } from './categoryList';

export const createCategory = createAsyncThunk('admins/createCategory', async (payload, thunkAPI) => {
  try {
    const { data } = await Api.createCategory(payload);
    thunkAPI.dispatch(categoryList());
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
