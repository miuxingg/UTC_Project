import React from 'react';
import { BookCart } from '../../components/collecttions';
import Layout from '../../components/templates/Layout';
import ProductsContainer from '../../containers/ProductsContainer';

export const ProductPage: React.FC = () => {
  return (
    <Layout>
      <ProductsContainer />
    </Layout>
  );
};

export default ProductPage;
