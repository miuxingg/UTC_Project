/* eslint-disable require-jsdoc */
import { AxiosInstance } from 'axios';

export class PaymentApi {
  constructor(private axiosInstance: AxiosInstance) {}

  async createPayment(request: any): Promise<any> {
    const { data } = await this.axiosInstance.post('/payment', request);
    return data;
  }
}
