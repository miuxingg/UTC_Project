/* eslint-disable require-jsdoc */
import { AxiosInstance } from 'axios';
import { IPaginationOutput } from '../../../configs/types';
import { BaseQuery } from '../../utils/buildQueries';
import { ICartApi, ICartApiUpload } from './types';

export class CartApi {
  constructor(private axiosInstance: AxiosInstance) {}

  async createCartItem(input: ICartApiUpload): Promise<ICartApi> {
    const { data } = await this.axiosInstance.post('/cart', input);
    return data;
  }

  async getAllCart(query?: BaseQuery): Promise<IPaginationOutput<ICartApi>> {
    const { data } = await this.axiosInstance.get('/cart', {
      params: { ...query },
    });
    return data;
  }

  async removeItem(id: string): Promise<any> {
    const { data } = await this.axiosInstance.delete(`/cart/${id}`);
    return data;
  }

  async updateQuantity(id: string, quantity: number): Promise<any> {
    const { data } = await this.axiosInstance.put(`/cart/${id}`, {
      quantity: quantity,
    });
    return data;
  }
}
