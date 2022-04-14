import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiSdk } from '../../libs/apis';
import { createGenericSlice } from '../../libs/utils/createGenericSlice';
import { IAddressState } from './types';

export const initialState: IAddressState = {};

export const getProvices = createAsyncThunk('getProvices', async () => {
  const data = await apiSdk.addressApis.getProvices();
  return data;
});

export const getDistrictsThunk = createAsyncThunk(
  'getDistrictsThunk',
  async (code: number) => {
    const data = await apiSdk.addressApis.getDistricts(code);
    return data;
  },
);

export const getWardsThunk = createAsyncThunk(
  'getWardsThunk',
  async (code: number) => {
    const data = await apiSdk.addressApis.getWards(code);
    return data;
  },
);

export const categorySlice = createGenericSlice({
  name: 'address',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProvices.fulfilled, (state, action) => {
      state.provinces = action.payload;
    });

    builder.addCase(getDistrictsThunk.fulfilled, (state, action) => {
      state.districts = action.payload;
    });

    builder.addCase(getWardsThunk.fulfilled, (state, action) => {
      state.wards = action.payload;
    });
  },
});

// export const {} = bookSlice.actions;

export default categorySlice.reducer;
