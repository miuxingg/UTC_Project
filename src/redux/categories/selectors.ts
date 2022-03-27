import { TRootState } from '..';

export const allCategories = (state: TRootState) => {
  return state.categories.allCategories ?? { total: 0, items: [] };
};

export const currentCategories = (state: TRootState) => {
  return state.categories.currentCategories ?? [];
};
