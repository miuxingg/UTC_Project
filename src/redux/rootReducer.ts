import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth';

import bookReducer from './book';
import categoryReducer from './categories';

const rootReducer = combineReducers({
  books: bookReducer,
  categories: categoryReducer,
  auth: authReducer,
});

export default rootReducer;
