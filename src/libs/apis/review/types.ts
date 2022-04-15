import { IProfile } from '../auth/types';

export interface IReviewApi {
  id: string;
  comment: string;
  rating: number;
  user: IProfile;
  createdAt: Date;
}

export interface IReviewCreate {
  bookId: string;
  comment: string;
  rating: number;
}
