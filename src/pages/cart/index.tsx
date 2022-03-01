import React, { memo } from 'react';
import Layout from '../../components/templates/Layout';
import CartContainer from '../../containers/CartContainers';

const CartPage: React.FC = () => {
  return (
    <Layout>
      <CartContainer />
    </Layout>
  );
};

export default CartPage;
