import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';

export const ticketList = createAsyncThunk('admins/ticketList', async ({ page, limit }, thunkAPI) => {
  try {
    const { data } = await Api.ticketList(page, limit);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
