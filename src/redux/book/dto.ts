import { IBook } from '../../components/collecttions';
import { IBookApi } from '../../libs/apis/book/types';

export const transformBookCart = (items: IBookApi[]): IBook[] => {
  return items.map((book) => {
    return {
      id: book.id,
      status: '',
      name: book.name,
      price: book.price,
      image: book.image,
      description: book.description,
      author: book.author,
      category: book.category,
      cloudtag: book.cloudtag,
    };
  });
};
