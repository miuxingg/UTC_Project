import { TRootState } from '..';

export const allPublisher = (state: TRootState) => {
  return state?.publisher?.allPublisher ?? { total: 0, items: [] };
};
