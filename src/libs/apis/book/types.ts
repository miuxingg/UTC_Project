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
  summary?: string;
  isCombo?: boolean;
  books?: IBookInCombo[];
  isFavorite?: boolean;
  rating?: number;
}

export interface IBookInCombo {
  id: string;
  name: string;
  thumbnail: string;
  author: string;
}

export interface ICheckQuantityBook {
  id: string;
  name: string;
  isQuantity: boolean;
}

export interface ICheckQuantityInput {
  bookId: string;
  quantity: number;
}
