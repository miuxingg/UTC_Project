import { createAsyncThunk } from '@reduxjs/toolkit';
import { t } from 'i18next';
import { apiSdk } from '../../libs/apis';
import { IGetOrderInput, IOrderInput } from '../../libs/apis/order/types';
import { createGenericSlice } from '../../libs/utils/createGenericSlice';
import { setError, setSuccess } from '../app';
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

export const updateOrderStatusThunk = createAsyncThunk(
  'updateOrderStatusThunk',
  async ({ id, status }: any, { dispatch }) => {
    try {
      const data = await apiSdk.orderApis.updateStatusOrder(id, status);
      dispatch(setSuccess({ message: 'Bạn đã huỷ đơn hàng thành công' }));
      return data;
    } catch (error) {
      // return error;
      dispatch(setError({ message: 'Hành động thất bại' }));
      console.log(error);
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

    builder.addCase(updateOrderStatusThunk.fulfilled, (state, action) => {
      console.log(action.payload);

      state.ordersByStatus = {
        items: (state.ordersByStatus?.items ?? []).filter(
          (item) => item.id !== action.payload?.id,
        ),
        total: (state.ordersByStatus?.total ?? 1) - 1,
      };
    });
  },
});

export const { updateOrderStatus } = orderSlice.actions;

export default orderSlice.reducer;
