/* eslint-disable require-jsdoc */
import { AxiosInstance } from 'axios';
import { IPaginationOutput } from '../../../configs/types';
import { BookQueries } from '../../utils/buildQueries';
import { IBookApi } from './types';

export class BookApi {
  constructor(private axiosInstance: AxiosInstance) {}

  async getAllBook(
    queries?: BookQueries,
  ): Promise<IPaginationOutput<IBookApi>> {
    const { data } = await this.axiosInstance.get('/books', {
      params: { ...queries },
    });
    return data;
  }

  async getBookById(id: string): Promise<IBookApi> {
    const { data } = await this.axiosInstance.get('/books/' + id);
    return data;
  }
}
