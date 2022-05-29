/* eslint-disable require-jsdoc */
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { GetServerSidePropsContext } from 'next';
import { API_BASE_URL, COOKIE_KEYS, HTTP_STATUS } from '../../configs';
import { Routers } from '../../configs/navigator';
import { getCookies, removeCookie } from '../utils/cookies';
import { AddressApi } from './address';
import { AuthApi } from './auth';
import { BlogApi } from './blog';
import { BookApi } from './book';
import { CartApi } from './cart';
import { CategoryApi } from './category';
import { FavoriteApi } from './favorite';
import { OrderApi } from './order';
import { PaymentApi } from './payment';
import { PublisherApi } from './publisher';
import { ReviewApi } from './review';
import { VoucherApi } from './voucher';

class BookStoreApi {
  private nextContext: GetServerSidePropsContext | null = null;
  instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: API_BASE_URL,
    });

    this.instance.interceptors.request.use(
      this.onRequestFullfilled,
      this.onRequestReject,
    );
    this.instance.interceptors.response.use(
      this.onResponseFullfilled,
      this.onResponseReject,
    );
  }

  setApiContext = (context: GetServerSidePropsContext): void => {
    this.nextContext = context;
  };

  onResponseFullfilled = (response: AxiosResponse): AxiosResponse => {
    return response;
  };
  onResponseReject = async (error: AxiosError) => {
    if (error.response) {
      switch (error.response?.status) {
        case HTTP_STATUS.UNAUTHORIZED: {
          const originalRequest: any = error.config;
          if (!originalRequest._retry) {
            originalRequest._retry = true;

            const _cookies = getCookies(null);
            if (_cookies[COOKIE_KEYS.REFRESH_TOKEN]) {
              const { data } = await this.instance.post('/auth/refresh-token', {
                refreshToken: _cookies[COOKIE_KEYS.REFRESH_TOKEN],
              });
              if (data.access_token) {
                originalRequest.headers.authorization = `Bearer ${data.access_token}`;
              }
            }
            return this.instance(originalRequest);
          }

          removeCookie(COOKIE_KEYS.ACCESS_TOKEN, this.nextContext);
          removeCookie(COOKIE_KEYS.REFRESH_TOKEN, this.nextContext);
          if (process.browser)
            window?.location.replace(
              Routers.login.path + '?redirect_uri=' + window?.location.pathname,
            );
          break;
        }
        case HTTP_STATUS.FORBIDDEN: // navigate to page 403
          break;
        default:
          throw {
            statusCode: error.response.status,
            message: this.getErrorMessage(error),
            field: error.response?.data?.field ?? '',
          };
      }
    } else {
      throw error;
    }
  };
  onRequestFullfilled = async (
    config: AxiosRequestConfig,
  ): Promise<AxiosRequestConfig> => {
    const cookies = getCookies(this.nextContext);
    if (cookies[COOKIE_KEYS.ACCESS_TOKEN]) {
      const bearerToken = `Bearer ${cookies[COOKIE_KEYS.ACCESS_TOKEN]}`;
      config.headers = {
        ...(config.headers ?? {}),
        ['Authorization']: bearerToken,
      };
    }

    return config;
  };
  onRequestReject = (error: any) => {
    return Promise.reject(error);
  };

  getErrorMessage = (error: AxiosError) => {
    if (error.response && error.response.data) {
      if (Array.isArray(error.response.data.message)) {
        return error.response.data.message[0];
      }
      return error.response.data.message;
    }
    return 'An error has occurred, please try again';
  };
}

const { instance, setApiContext } = new BookStoreApi();

export namespace apiSdk {
  export const bookApis = new BookApi(instance);
  export const categoryApis = new CategoryApi(instance);
  export const authApis = new AuthApi(instance);
  export const cartApis = new CartApi(instance);
  export const addressApis = new AddressApi(instance);
  export const orderApis = new OrderApi(instance);
  export const payment = new PaymentApi(instance);
  export const reviewApi = new ReviewApi(instance);
  export const publisherApi = new PublisherApi(instance);
  export const favoriteApi = new FavoriteApi(instance);
  export const blogApi = new BlogApi(instance);
  export const voucherApi = new VoucherApi(instance);
}

export { setApiContext };
