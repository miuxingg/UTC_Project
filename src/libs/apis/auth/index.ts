import { AxiosInstance } from 'axios';
import { IAuthenticated, IAuthLocal, IVerifyEmail } from './types';

export class AuthApi {
  constructor(private axiosInstance: AxiosInstance) {}

  async loginLocal(user: IAuthLocal): Promise<IAuthenticated> {
    const { data } = await this.axiosInstance.post('/auth/login', user);
    return data;
  }

  async logout(): Promise<void> {
    await this.axiosInstance.post('/auth/logout');
  }

  async registerLocal(user: IAuthLocal): Promise<void> {
    await this.axiosInstance.post('/auth/register', user);
  }

  async verifyEmail(data: IVerifyEmail): Promise<void> {
    await this.axiosInstance.post('/auth/verify-email', data);
  }
}
