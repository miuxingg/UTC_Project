import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiSdk } from '../../libs/apis';
import { createGenericSlice } from '../../libs/utils/createGenericSlice';
import { ICategoryState } from './types';

export const initialState: ICategoryState = {};

export const getAllCategory = createAsyncThunk('getAllCategory', async () => {
  const data = await apiSdk.categoryApis.getAllCategory();
  return data;
});

export const getCategoryByIds = createAsyncThunk(
  'getCategoryByIds',
  async (ids: string[]) => {
    const data = await apiSdk.categoryApis.getCategoryByIds(ids);
    return data;
  },
);

export const categorySlice = createGenericSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCategory.fulfilled, (state, action) => {
      state.allCategories = {
        items: action.payload.items,
        total: action.payload.total,
      };
    });
    builder.addCase(getCategoryByIds.fulfilled, (state, action) => {
      state.currentCategories = action.payload;
    });
  },
});

// export const {} = bookSlice.actions;

export default categorySlice.reducer;
