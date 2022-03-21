import { TRootState } from '..';

export const newBook = (state: TRootState) => {
  return state.books.newBook ?? { total: 0, items: [] };
};

export const allBookByFilter = (state: TRootState) => {
  return state.books.allBooks ?? { total: 0, items: [] };
};

export const bookDetailSelector = (state: TRootState) => {
  return (
    state.books.bookDetail ?? {
      id: '',
      name: '',
      price: '',
      description: '',
      author: '',
      category: '',
      cloudtag: [],
      image: '',
    }
  );
};
