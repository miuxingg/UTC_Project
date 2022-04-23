import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiSdk } from '../../libs/apis';
import { IReviewCreate } from '../../libs/apis/review/types';
import { BaseQuery } from '../../libs/utils/buildQueries';
import { createGenericSlice } from '../../libs/utils/createGenericSlice';
import { IReviewState } from './types';

export const initialState: IReviewState = {};

export const getAllReviewOnBook = createAsyncThunk(
  'getAllReviewOnBook',
  async ({ idBook, queries }: { idBook: string; queries?: BaseQuery }) => {
    const data = await apiSdk.reviewApi.getReviewOnBook(idBook, queries);
    return data;
  },
);

export const getMoreReviewOnBook = createAsyncThunk(
  'getMoreReviewOnBook',
  async ({ idBook, queries }: { idBook: string; queries?: BaseQuery }) => {
    const data = await apiSdk.reviewApi.getReviewOnBook(idBook, queries);
    return data;
  },
);

export const createReviewOnBook = createAsyncThunk(
  'createReviewOnBook',
  async (input: IReviewCreate) => {
    const data = await apiSdk.reviewApi.createReview(input);
    return data;
  },
);

export const reviewSlice = createGenericSlice({
  name: 'review',
  initialState,
  reducers: {
    insertNewReview(state, action) {
      state.reviewOnBook = {
        items: [action.payload, ...(state.reviewOnBook?.items ?? [])],
        total: (state.reviewOnBook?.total ?? 0) + 1,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllReviewOnBook.fulfilled, (state, action) => {
      state.reviewOnBook = {
        items: action.payload.items,
        total: action.payload.total,
      };
    });
    builder.addCase(getMoreReviewOnBook.fulfilled, (state, action) => {
      state.reviewOnBook = {
        items: [...(state.reviewOnBook?.items ?? []), ...action.payload.items],
        total: state.reviewOnBook?.total ?? 0,
      };
    });
  },
});

export const { insertNewReview } = reviewSlice.actions;

export default reviewSlice.reducer;
