/* eslint-disable require-jsdoc */
import { AxiosInstance } from 'axios';
import { IPaginationOutput } from '../../../configs/types';
import { BaseQuery } from '../../utils/buildQueries';
import { IVoucherApi } from './types';

export class VoucherApi {
  constructor(private axiosInstance: AxiosInstance) {}

  async getAllVoucher(
    queries?: BaseQuery,
  ): Promise<IPaginationOutput<IVoucherApi>> {
    const { data } = await this.axiosInstance.get('/voucher', {
      params: { ...queries },
    });
    return data;
  }
}
