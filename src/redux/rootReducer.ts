import { combineReducers } from '@reduxjs/toolkit';

import authReducer from './auth';
import appReducer from './app';
import bookReducer from './book';
import categoryReducer from './categories';
import cartReducer from './cart';
import addressReducer from './address';
import orderReducer from './order';

const rootReducer = combineReducers({
  app: appReducer,
  books: bookReducer,
  categories: categoryReducer,
  auth: authReducer,
  cart: cartReducer,
  address: addressReducer,
  order: orderReducer,
});

export default rootReducer;
