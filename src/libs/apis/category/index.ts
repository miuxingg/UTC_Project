/* eslint-disable require-jsdoc */
import { AxiosInstance } from 'axios';
import { IPaginationOutput } from '../../../configs/types';
import { ICategoryApi } from './types';

export class CategoryApi {
  constructor(private axiosInstance: AxiosInstance) {}

  async getAllCategory(): Promise<IPaginationOutput<ICategoryApi>> {
    const { data } = await this.axiosInstance.get('/category');
    return data;
  }

  async getCategoryByIds(ids: string[]): Promise<ICategoryApi[]> {
    const { data } = await this.axiosInstance.post('/category/categoryByIds', {
      ids,
    });
    return data;
  }
}
