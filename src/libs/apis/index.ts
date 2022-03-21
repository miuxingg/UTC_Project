/* eslint-disable require-jsdoc */
import axios, { AxiosInstance } from 'axios';
import { GetServerSidePropsContext } from 'next';
import { API_BASE_URL } from '../../configs';
import { BookApi } from './book';
import { CategoryApi } from './category';

class BookStoreApi {
  private nextContext: GetServerSidePropsContext | null = null;
  instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: API_BASE_URL,
    });
    // this.instance.interceptors.request.use(
    //   this.onRequestFullfilled,
    //   this.onRequestReject,
    // );
    // this.instance.interceptors.response.use(
    //   this.onResponseFullfilled,
    //   this.onResponseReject,
    // );
  }

  setApiContext = (context: GetServerSidePropsContext): void => {
    this.nextContext = context;
  };
}

const { instance, setApiContext } = new BookStoreApi();

export namespace apiSdk {
  export const bookApis = new BookApi(instance);
  export const categoryApis = new CategoryApi(instance);
}

export { setApiContext };
