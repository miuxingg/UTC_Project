import { IPaginationOutput } from '../../configs/types';
import { IBookApi } from '../../libs/apis/book/types';

export interface IBookState {
  newBook?: IPaginationOutput<IBookApi>;
  allBooks?: IPaginationOutput<IBookApi>;
  bookDetail?: IBookApi;
  cloudtag?: IPaginationOutput<string>;
}
