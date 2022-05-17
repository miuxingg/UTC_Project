import { AxiosInstance } from 'axios';
import {
  IAuthenticated,
  IAuthLocal,
  IProfile,
  IVerifyEmail,
  ResponseDto,
} from './types';

export class AuthApi {
  constructor(private axiosInstance: AxiosInstance) {}

  async loginLocal(user: IAuthLocal): Promise<IAuthenticated> {
    const { data } = await this.axiosInstance.post('/auth/login', user);
    return data;
  }

  async logout(): Promise<void> {
    await this.axiosInstance.post('/auth/logout');
  }

  async registerLocal(user: IAuthLocal): Promise<ResponseDto> {
    const { data } = await this.axiosInstance.post('/auth/register', user);
    return data;
  }

  async verifyEmail(data: IVerifyEmail): Promise<void> {
    await this.axiosInstance.post('/auth/verify-email', data);
  }

  async updateProfile(input: IProfile): Promise<IProfile> {
    const { data } = await this.axiosInstance.put('/auth', { ...input });
    return data;
  }

  async getProfile(): Promise<IProfile> {
    const { data } = await this.axiosInstance.get('/auth/profile');
    return data;
  }

  async forgotPassword(input: { email: string }) {
    const { data } = await this.axiosInstance.post(
      '/auth/forgot-password',
      input,
    );
    return data;
  }

  async changePassword(currentPassword: string, newPassword: string) {
    const { data } = await this.axiosInstance.post('/auth/change-password', {
      currentPassword,
      newPassword,
    });
    return data;
  }

  async loginGoogle(): Promise<IAuthenticated> {
    const { data } = await this.axiosInstance.get('/auth/login-google/');
    return data;
  }
}
