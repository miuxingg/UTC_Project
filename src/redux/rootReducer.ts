import { combineReducers } from '@reduxjs/toolkit';

import bookReducer from './book';
import categoryReducer from './categories';

const rootReducer = combineReducers({
  books: bookReducer,
  categories: categoryReducer,
});

export default rootReducer;
