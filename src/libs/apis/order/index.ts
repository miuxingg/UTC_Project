/* eslint-disable require-jsdoc */
import { AxiosInstance } from 'axios';
import { IPaginationOutput } from '../../../configs/types';
import { IOrderInput } from './types';

export class OrderApi {
  constructor(private axiosInstance: AxiosInstance) {}

  async createOrder(dataCreate: IOrderInput): Promise<any> {
    const { data } = await this.axiosInstance.post('/order', { ...dataCreate });
    return data;
  }
}
