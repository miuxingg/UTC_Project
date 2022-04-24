import { IBook } from '../../components/collecttions';
import { IBookApi } from '../../libs/apis/book/types';
import { moneyFormat } from '../../libs/utils';

export const transformBookCart = (items: IBookApi[]): IBook[] => {
  return items.map((book) => {
    return {
      id: book?.id,
      name: book.name,
      price: moneyFormat(book.price),
      priceUnDiscount: moneyFormat(book.priceUnDiscount),
      thumbnail: book.thumbnail,
      description: book.description,
      author: book.author,
      category: book.category,
      cloudtag: book.cloudtag,
      images: book.images,
      status: book.status,
      summary: book?.summary,
      isFavorite: book?.isFavorite,
      rating: book?.rating,
    };
  });
};
