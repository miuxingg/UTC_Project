import { unwrapResult } from '@reduxjs/toolkit';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getItemDataStorage,
  LocalStorageKey,
} from '../../libs/utils/localStorage';
import { authSelector } from '../../redux/auth/selectors';
import { bookOnCart } from '../../redux/book';
import { getAllCart, setCart } from '../../redux/cart';
import Footer from './Footer';
import Header, { transformDataToCart } from './Header';

const Layout: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(authSelector);
  const bookOnCartLocal = getItemDataStorage(LocalStorageKey.BookStoreCart);
  const getBookOnCart = useCallback(async () => {
    if (bookOnCartLocal) {
      const data = JSON.parse(bookOnCartLocal);
      const listIds = data.map((item: any) => item.bookId);
      if (listIds.length) {
        const response = await dispatch(bookOnCart(listIds));
        const dataBook = unwrapResult(response as any);
        const itemsCart = transformDataToCart(dataBook.items, bookOnCartLocal);
        dispatch(setCart({ items: itemsCart, total: dataBook.total }));
        // console.log({ items: itemsCart, total: dataBook.total });
      }
    }
  }, [dispatch]);
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getAllCart({ limit: 20 }));
    } else {
      getBookOnCart();
    }
  }, [dispatch, bookOnCartLocal, isAuthenticated]);
  return (
    <div>
      <Header bookCartLocal={bookOnCartLocal} />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
