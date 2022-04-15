/* eslint-disable require-jsdoc */
import { AxiosInstance } from 'axios';
import { IPaginationOutput } from '../../../configs/types';
import { BaseQuery } from '../../utils/buildQueries';
import { IReviewApi, IReviewCreate } from './types';

export class ReviewApi {
  constructor(private axiosInstance: AxiosInstance) {}

  async createReview(input: IReviewCreate): Promise<any> {
    const { data } = await this.axiosInstance.post('/reviews', input);
    return data;
  }

  async getReviewOnBook(
    bookId: string,
    queries?: BaseQuery,
  ): Promise<IPaginationOutput<IReviewApi>> {
    const { data } = await this.axiosInstance.get(`/reviews/${bookId}`, {
      params: { ...queries },
    });
    return data;
  }
}
