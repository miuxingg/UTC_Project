import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiSdk } from '../../libs/apis';
import { createGenericSlice } from '../../libs/utils/createGenericSlice';
import { ICategoryState } from './types';

export const initialState: ICategoryState = {};

export const getAllCategory = createAsyncThunk('getAllCategory', async () => {
  const data = await apiSdk.categoryApis.getAllCategory();
  return data;
});

export const categorySlice = createGenericSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCategory.fulfilled, (state, action) => {
      state.allCategories = {
        items: action.payload.items,
        total: action.payload.total,
      };
    });
  },
});

// export const {} = bookSlice.actions;

export default categorySlice.reducer;
