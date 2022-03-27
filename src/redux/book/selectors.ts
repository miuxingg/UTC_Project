import { TRootState } from '..';
import { IBook } from '../../components/collecttions';

export const newBook = (state: TRootState) => {
  return state.books.newBook ?? { total: 0, items: [] };
};

export const allBookByFilter = (state: TRootState) => {
  return state.books.allBooks ?? { total: 0, items: [] };
};

export const bookDetailSelector = (state: TRootState): IBook => {
  return (
    state.books.bookDetail ?? {
      id: '',
      name: '',
      price: 0,
      priceUnDiscount: 0,
      description: '',
      author: '',
      category: [],
      cloudTag: [],
      thumbnail: '',
      images: [],
      status: '',
      quantity: 0,
    }
  );
};

export const allCloudtag = (state: TRootState) => {
  return state.books.cloudtag ?? { total: 0, items: [] };
};
