import { IPaginationOutput } from '../../configs/types';
import { IBookApi } from '../../libs/apis/book/types';

export interface IBookState {
  newBook?: IPaginationOutput<IBookApi>;
  bookByCombos?: IPaginationOutput<IBookApi>;
  allBooks?: IPaginationOutput<IBookApi>;
  bookBestSaler?: IPaginationOutput<IBookApi>;
  bookonCart?: IPaginationOutput<IBookApi>;
  bookDetail?: IBookApi;
  cloudtag?: IPaginationOutput<string>;
}
