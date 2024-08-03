import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../Api';
import { scheduleList } from './scheduleList';

export const deleteSchedule = createAsyncThunk('admins/deleteSchedule', async (payload, thunkAPI) => {
  try {
    await Api.deleteSchedule(payload);
    thunkAPI.dispatch(scheduleList());
    return payload;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});
