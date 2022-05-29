import { combineReducers } from '@reduxjs/toolkit';

import authReducer from './auth';
import appReducer from './app';
import bookReducer from './book';
import categoryReducer from './categories';
import cartReducer from './cart';
import addressReducer from './address';
import orderReducer from './order';
import reviewReducer from './review';
import publisherReducer from './publisher';
import blogReducer from './blog';
import voucherReducer from './voucher';

const rootReducer = combineReducers({
  app: appReducer,
  books: bookReducer,
  categories: categoryReducer,
  auth: authReducer,
  cart: cartReducer,
  address: addressReducer,
  order: orderReducer,
  review: reviewReducer,
  publisher: publisherReducer,
  blog: blogReducer,
  voucher: voucherReducer,
});

export default rootReducer;
