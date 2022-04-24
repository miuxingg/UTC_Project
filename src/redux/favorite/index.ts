import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiSdk } from '../../libs/apis';
import { createGenericSlice } from '../../libs/utils/createGenericSlice';
import { IFavoriteState } from './types';

export const initialState: IFavoriteState = {};

export const getAllCategory = createAsyncThunk('getAllCategory', async () => {
  const data = await apiSdk.categoryApis.getAllCategory();
  return data;
});

export const toggleFavorite = createAsyncThunk(
  'toggleFavorite',
  async (bookId: string) => {
    const data = await apiSdk.favoriteApi.toggleFavorite(bookId);
    return data;
  },
);

export const categorySlice = createGenericSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

// export const {} = bookSlice.actions;

export default categorySlice.reducer;
