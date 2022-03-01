import React from 'react';
import Layout from '../../components/templates/Layout';
import ProductDetailContainer from '../../containers/ProductDetails';
const ProductDetail: React.FC = () => {
  return (
    <Layout>
      <ProductDetailContainer />
    </Layout>
  );
};

export default ProductDetail;
