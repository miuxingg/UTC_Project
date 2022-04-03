import { IPaginationOutput } from '../../configs/types';
import { ICartApi } from '../../libs/apis/cart/types';
import { ICategoryApi } from '../../libs/apis/category/types';

export interface ICartState {
  cartItems?: IPaginationOutput<ICartApi>;
}
