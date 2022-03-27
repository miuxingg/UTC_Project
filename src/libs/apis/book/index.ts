/* eslint-disable require-jsdoc */
import { Pagination } from '@mui/material';
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

  async getCloundTag(): Promise<IPaginationOutput<string>> {
    const { data } = await this.axiosInstance.get('/books/cloudtag');
    return data;
  }
}
