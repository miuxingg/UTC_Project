import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ITEM_PER_PAGE } from '../../configs';
import { getAllCart } from '../../redux/cart';
import Footer from './Footer';
import Header from './Header';

const Layout: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCart({ limit: 10 }));
  }, [dispatch]);
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
