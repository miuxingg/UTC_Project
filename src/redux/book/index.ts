import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiSdk } from '../../libs/apis';
import { BookQueries } from '../../libs/utils/buildQueries';
import { createGenericSlice } from '../../libs/utils/createGenericSlice';
import { authorized } from '../auth/action';
import { IBookState } from './types';

export const initialState: IBookState = {};

export const getNewsBook = createAsyncThunk(
  'getNewsBooks',
  async (queries?: BookQueries) => {
    const data = await apiSdk.bookApis.getAllBook(queries);
    return data;
  },
);

export const allBooksByFilter = createAsyncThunk(
  'allBooksByFilter',
  async (queries?: BookQueries) => {
    const data = await apiSdk.bookApis.getAllBook(queries);
    return data;
  },
);

export const bookBestSaler = createAsyncThunk('bookBestSaler', async () => {
  const data = await apiSdk.bookApis.getBestSalerBooks();
  return data;
});

export const bookById = createAsyncThunk('bookById', async (id: string) => {
  const data = await apiSdk.bookApis.getBookById(id);
  return data;
});

export const bookOnCart = createAsyncThunk(
  'bookOnCart',
  async (ids: string[]) => {
    const data = await apiSdk.bookApis.getBookByIds(ids);
    return data;
  },
);

export const cloudtag = createAsyncThunk('cloudtag', async () => {
  const data = await apiSdk.bookApis.getCloundTag();
  return data;
});

export const bookSlice = createGenericSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNewsBook.fulfilled, (state, action) => {
      state.newBook = {
        items: action.payload.items,
        total: action.payload.total,
      };
    });

    builder.addCase(allBooksByFilter.fulfilled, (state, action) => {
      state.allBooks = {
        items: action.payload.items,
        total: action.payload.total,
      };
    });

    builder.addCase(bookById.fulfilled, (state, action) => {
      state.bookDetail = action.payload;
    });

    builder.addCase(bookOnCart.fulfilled, (state, action) => {
      state.bookonCart = action.payload;
    });

    builder.addCase(cloudtag.fulfilled, (state, action) => {
      state.cloudtag = action.payload;
    });

    builder.addCase(bookBestSaler.fulfilled, (state, action) => {
      state.bookBestSaler = {
        items: action.payload.items,
        total: action.payload.total,
      };
    });
  },
});

// export const {} = bookSlice.actions;

export default bookSlice.reducer;
