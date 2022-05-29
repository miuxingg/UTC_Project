import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiSdk } from '../../libs/apis';
import { BaseQuery } from '../../libs/utils/buildQueries';
import { createGenericSlice } from '../../libs/utils/createGenericSlice';
import { setError, setSuccess } from '../app';
import { IVoucherState } from './types';

export const initialState: IVoucherState = {};

export const getAllVoucherThunk = createAsyncThunk(
  'getAllVouchers',
  async (queries: BaseQuery) => {
    const data = await apiSdk.voucherApi.getAllVoucher(queries);
    return data;
  },
);

export const voucherSlice = createGenericSlice({
  name: 'voucher',
  initialState,
  reducers: {
    getvoucher(state, action) {
      state.vouchers = {
        items: action.payload.items,
        total: action.payload.total,
      };
    },
    removeVoucher(state, action) {
      const newVouchers = (state?.vouchers?.items || []).filter(({ id }) => {
        return id !== action.payload.id;
      });
      state.vouchers = { items: newVouchers, total: newVouchers.length };
    },
    addVoucher(state, action) {
      const newVouchers = [...(state?.vouchers?.items || []), action.payload];
      state.vouchers = { items: newVouchers, total: newVouchers.length };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllVoucherThunk.fulfilled, (state, action) => {
      state.vouchers = {
        items: action.payload.items,
        total: action.payload.total,
      };
    });
  },
});

export const { getvoucher, removeVoucher, addVoucher } = voucherSlice.actions;

export default voucherSlice.reducer;
