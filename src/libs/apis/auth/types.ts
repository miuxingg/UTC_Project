import { IAddressApi } from '../address/types';

export interface ResponseDto {
  statusCode: number;
  message: string;
  field?: string;
}

export interface IProfile {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  avatar?: string;
  province?: IAddressApi;
  district?: IAddressApi;
  ward?: IAddressApi;
  privateHome?: string;
}

export interface IAuthLocal {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface IAuthenticated {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  refresh_expires_in?: number;
}

export interface IVerifyEmail {
  code: string;
}
