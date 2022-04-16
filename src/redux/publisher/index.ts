import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiSdk } from '../../libs/apis';
import { createGenericSlice } from '../../libs/utils/createGenericSlice';
import { IPublisherState } from './types';

export const initialState: IPublisherState = {};

export const getAllPublishers = createAsyncThunk(
  'getAllPublishers',
  async () => {
    const data = await apiSdk.publisherApi.getAllPublisher();
    return data;
  },
);

export const publisherSlice = createGenericSlice({
  name: 'publisher',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllPublishers.fulfilled, (state, action) => {
      state.allPublisher = {
        items: action.payload.items,
        total: action.payload.total,
      };
    });
  },
});

// export const {} = bookSlice.actions;

export default publisherSlice.reducer;
