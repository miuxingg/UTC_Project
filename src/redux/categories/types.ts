import { IPaginationOutput } from '../../configs/types';
import { ICategoryApi } from '../../libs/apis/category/types';

export interface ICategoryState {
  allCategories?: IPaginationOutput<ICategoryApi>;
  currentCategories?: ICategoryApi[];
}
