import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/templates/Layout';
import CartContainer from '../../containers/CartContainers';
import { getServerSideWithPublicRoute } from '../../libs/hocs/getServerSideWithPublicRoute';
import { authSelector } from '../../redux/auth/selectors';
import { getAllCart } from '../../redux/cart';

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(authSelector);
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getAllCart({ limit: 20 }));
    }
  }, [dispatch]);
  return (
    <Layout>
      <CartContainer />
    </Layout>
  );
};

export const getServerSideProps = getServerSideWithPublicRoute(
  async (_, store) => {
    return {
      props: {},
    };
  },
);
export default CartPage;
