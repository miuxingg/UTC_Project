/* eslint-disable require-jsdoc */
import { AxiosInstance } from 'axios';
import { IFavoriteCreateApi } from './types';

export class FavoriteApi {
  constructor(private axiosInstance: AxiosInstance) {}

  async toggleFavorite(book: string): Promise<IFavoriteCreateApi> {
    const { data } = await this.axiosInstance.post('/favorite/toggle', {
      book,
    });
    return data;
  }
}
