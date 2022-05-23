import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiSdk } from '../../libs/apis';
import { BaseQuery } from '../../libs/utils/buildQueries';
import { createGenericSlice } from '../../libs/utils/createGenericSlice';
import { IBlogState } from './types';

export const initialState: IBlogState = {};

export const getAllBlogThunk = createAsyncThunk(
  'getAllBlog',
  async (queries: BaseQuery) => {
    const data = await apiSdk.blogApi.getAllBlog(queries);
    return data;
  },
);

export const blogSlice = createGenericSlice({
  name: 'blog',
  initialState,
  reducers: {
    getAllBlog(state, action) {
      state.allBlog = action.payload.blog;
    },
  },
  extraReducers: (builder) => {},
});

export const { getAllBlog } = blogSlice.actions;

export default blogSlice.reducer;
