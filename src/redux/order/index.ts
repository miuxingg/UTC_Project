import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiSdk } from '../../libs/apis';
import { IOrderInput } from '../../libs/apis/order/types';
import { createGenericSlice } from '../../libs/utils/createGenericSlice';
import { IOrderState } from './types';

export const initialState: IOrderState = {};

export const createOrder = createAsyncThunk(
  'createOrder',
  async (orderInput: IOrderInput) => {
    try {
      const data = await apiSdk.orderApis.createOrder(orderInput);
      console.log(data);

      return data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const orderSlice = createGenericSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

// export const {} = bookSlice.actions;

export default orderSlice.reducer;
