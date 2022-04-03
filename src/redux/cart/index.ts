import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiSdk } from '../../libs/apis';
import { ICartApiUpload } from '../../libs/apis/cart/types';
import { BaseQuery } from '../../libs/utils/buildQueries';
import { createGenericSlice } from '../../libs/utils/createGenericSlice';
import { ICartState } from './types';

export const initialState: ICartState = {};

export const createCartItem = createAsyncThunk(
  'createCartItem',
  async (input: ICartApiUpload) => {
    const data = await apiSdk.cartApis.createCartItem(input);
    return data;
  },
);

export const getAllCart = createAsyncThunk(
  'getAllCart',
  async (query?: BaseQuery) => {
    return await apiSdk.cartApis.getAllCart(query);
  },
);

export const removeItem = createAsyncThunk('removeItem', async (id: string) => {
  return apiSdk.cartApis.removeItem(id);
});

export const categorySlice = createGenericSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createCartItem.fulfilled, (state, action) => {
      const currentItem = state.cartItems?.items.filter(
        (item) => item.id !== action.payload.id,
      );
      state.cartItems = {
        items: [...(currentItem || []), { ...action.payload }],
        total: [...(currentItem || []), { ...action.payload }].length,
      };
    });

    builder.addCase(getAllCart.fulfilled, (state, action) => {
      state.cartItems = action.payload;
    });

    builder.addCase(removeItem.fulfilled, (state, action) => {
      state.cartItems = {
        items: (state?.cartItems?.items || []).filter(
          (item) => item.id !== action.payload.id,
        ),
        total: (state.cartItems?.total || 1) - 1,
      };
    });
  },
});

// export const {} = bookSlice.actions;

export default categorySlice.reducer;
