/* eslint-disable require-jsdoc */
import { AxiosInstance } from 'axios';
import { IPaginationOutput } from '../../../configs/types';
import { BaseQuery } from '../../utils/buildQueries';
import { IAddressApi } from './types';

export class AddressApi {
  constructor(private axiosInstance: AxiosInstance) {}

  async getProvices(): Promise<IAddressApi[]> {
    const { data } = await this.axiosInstance.get('/address/provices');
    return data;
  }

  async getDistricts(proviceId: number): Promise<IAddressApi[]> {
    const { data } = await this.axiosInstance.get('/address/districts', {
      params: { proviceId },
    });
    return data;
  }

  async getWards(districtId: number): Promise<IAddressApi[]> {
    const { data } = await this.axiosInstance.get('/address/wards', {
      params: { districtId },
    });
    return data;
  }
}
