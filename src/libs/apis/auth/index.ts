/* eslint-disable require-jsdoc */
import { AxiosInstance } from 'axios';
import { ResponseDto } from './types';

export class AuthApi {
  constructor(private axiosInstance: AxiosInstance) {}

  async register(email: string, password: string): Promise<ResponseDto> {
    const { data } = await this.axiosInstance.post('/auth', {
      email,
      password,
    });
    return data;
  }
}
