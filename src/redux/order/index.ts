import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiSdk } from '../../libs/apis';
import { IGetOrderInput, IOrderInput } from '../../libs/apis/order/types';
import { createGenericSlice } from '../../libs/utils/createGenericSlice';
import { IOrderState } from './types';

export const initialState: IOrderState = {};

export const createOrder = createAsyncThunk(
  'createOrder',
  async (orderInput: IOrderInput) => {
    try {
      const data = await apiSdk.orderApis.createOrder(orderInput);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const getOrderByStatus = createAsyncThunk(
  'getOrderByStatus',
  async (queries: IGetOrderInput) => {
    try {
      const data = await apiSdk.orderApis.getOrderByStatus(queries);
      return data;
    } catch (err) {
      console.log(err);
    }
  },
);

export const orderSlice = createGenericSlice({
  name: 'order',
  initialState,
  reducers: {
    updateOrderStatus(state, action) {
      state.ordersByStatus = {
        items: (state.ordersByStatus?.items ?? []).filter(
          (item) => item.id !== action.payload.id,
        ),
        total: state.ordersByStatus?.total ?? 0,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOrderByStatus.fulfilled, (state, action) => {
      state.ordersByStatus = action.payload;
    });
  },
});

export const { updateOrderStatus } = orderSlice.actions;

export default orderSlice.reducer;
