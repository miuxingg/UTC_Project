import { ICategoryApi } from '../category/types';

export interface IBookApi {
  id: string;
  name: string;
  price: number;
  priceUnDiscount: number;
  description: string;
  author: string;
  category: ICategoryApi[];
  cloudtag: string[];
  thumbnail: string;
  images: string[];
  status: string;
  quantity: number;
}
