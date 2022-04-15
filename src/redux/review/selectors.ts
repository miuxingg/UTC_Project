import { TRootState } from '..';

export const allReviewOnBook = (state: TRootState) => {
  return state.review?.reviewOnBook ?? { total: 0, items: [] };
};
