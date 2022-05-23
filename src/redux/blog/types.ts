import { IPaginationOutput } from '../../configs/types';
import { IBlogApi } from '../../libs/apis/blog/types';

export interface IBlogState {
  allBlog?: IBlogApi[];
}
