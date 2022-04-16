/* eslint-disable require-jsdoc */
import { AxiosInstance } from 'axios';
import { IPaginationOutput } from '../../../configs/types';
import { IPublisherApi } from './types';

export class PublisherApi {
  constructor(private axiosInstance: AxiosInstance) {}

  async getAllPublisher(): Promise<IPaginationOutput<IPublisherApi>> {
    const { data } = await this.axiosInstance.get('/publisher');
    return data;
  }
}
