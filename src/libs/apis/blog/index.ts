/* eslint-disable require-jsdoc */
import { AxiosInstance } from 'axios';
import { IPaginationOutput } from '../../../configs/types';
import { BaseQuery } from '../../utils/buildQueries';
import { IConfig } from '../config/type';
import { IBlogApi } from './types';

export class BlogApi {
  constructor(private axiosInstance: AxiosInstance) {}

  async getAllBlog(queries: BaseQuery): Promise<IConfig> {
    const { data } = await this.axiosInstance.get('/configs');
    return data;
  }
}
