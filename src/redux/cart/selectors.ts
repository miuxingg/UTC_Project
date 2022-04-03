import { TRootState } from '..';
import { IPaginationOutput } from '../../configs/types';
import { ICartApi } from '../../libs/apis/cart/types';

export const allCart = (state: TRootState): IPaginationOutput<ICartApi> => {
  return state.cart.cartItems ?? { total: 0, items: [] };
};
