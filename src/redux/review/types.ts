import { IPaginationOutput } from '../../configs/types';
import { IReviewApi } from '../../libs/apis/review/types';

export interface IReviewState {
  reviewOnBook?: IPaginationOutput<IReviewApi>;
}
