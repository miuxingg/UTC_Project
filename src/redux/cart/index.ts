import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiSdk } from '../../libs/apis';
import { ICartApiUpload } from '../../libs/apis/cart/types';
import { BaseQuery } from '../../libs/utils/buildQueries';
import { createGenericSlice } from '../../libs/utils/createGenericSlice';
import { IAppMessage } from '../app';
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

export const updateQuantityItem = createAsyncThunk(
  'updateQuantityItem',
  async ({ id, quantity }: any) => {
    await apiSdk.cartApis.updateQuantity(id, quantity);
    return { id, quantity };
  },
);

export const categorySlice = createGenericSlice({
  name: 'cart',
  initialState,
  reducers: {
    deleteCart(state, action: PayloadAction<{ message: string }>) {
      state.cartItems = {
        items: [],
        total: 0,
      };
    },

    setCart(state, action) {
      state.cartItems = action.payload;
    },

    addItemToCart(state, action) {
      const current = state.cartItems?.items.filter((item) => {
        return item.id !== action.payload.id;
      });
      const newCart = [...(current ?? []), action.payload];
      state.cartItems = {
        items: newCart,
        total: newCart.length,
      };
    },

    deleteItem(state, action) {
      state.cartItems = {
        items:
          state.cartItems?.items.filter(
            (item) => item.id !== action.payload.id,
          ) ?? [],
        total: state.cartItems?.total ?? 0,
      };
    },
    updateQuantityCart(state, action) {
      const newState = state.cartItems?.items.map((item) => {
        return {
          ...item,
          quantity:
            item.id === action.payload.id
              ? action.payload.quantity
              : item.quantity,
        };
      });
      state.cartItems = {
        items: newState ?? [],
        total: state.cartItems?.total ?? 0,
      };
    },
  },
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

export const {
  deleteCart,
  setCart,
  deleteItem,
  addItemToCart,
  updateQuantityCart,
} = categorySlice.actions;

export default categorySlice.reducer;
