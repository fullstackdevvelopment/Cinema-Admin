import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';

export const createSchedule = createAsyncThunk('schedule/createSchedule', async (payload, thunkAPI) => {
  try {
    const { data } = await Api.createSchedule(payload);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
