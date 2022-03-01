import React from 'react';
import Layout from '../../components/templates/Layout';
import CheckoutContainer from '../../containers/CheckoutContainer';

const CheckOutPage: React.FC = () => {
  return (
    <Layout>
      <CheckoutContainer />
    </Layout>
  );
};

export default CheckOutPage;
