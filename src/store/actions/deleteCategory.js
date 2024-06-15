import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';
import { categoryList } from './categoryList';

export const deleteCategory = createAsyncThunk('admins/deleteCategory', async (payload, thunkAPI) => {
  try {
    await Api.deleteCategory(payload);
    thunkAPI.dispatch(categoryList());
    return payload;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
