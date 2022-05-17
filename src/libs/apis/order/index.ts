/* eslint-disable require-jsdoc */
import { AxiosInstance } from 'axios';
import { IPaginationOutput } from '../../../configs/types';
import {
  IGetOrderInput,
  IOrderInput,
  IOrderOutput,
  IOrderStatus,
} from './types';

export class OrderApi {
  constructor(private axiosInstance: AxiosInstance) {}

  async createOrder(dataCreate: IOrderInput): Promise<any> {
    const { data } = await this.axiosInstance.post('/order', { ...dataCreate });
    return data;
  }

  async getOrderByStatus(
    queries: IGetOrderInput,
  ): Promise<IPaginationOutput<IOrderOutput>> {
    const { data } = await this.axiosInstance.get('/order', {
      params: { ...queries },
    });
    return data;
  }

  async updateStatusOrder(
    id: string,
    status: IOrderStatus,
  ): Promise<IOrderOutput> {
    const { data } = await this.axiosInstance.put(`/order/status/${id}`, {
      status,
    });
    return data;
  }
}
