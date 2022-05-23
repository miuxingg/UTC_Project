import { TRootState } from '..';

export const allBlog = (state: TRootState) => {
  return state.blog?.allBlog ?? [];
};
