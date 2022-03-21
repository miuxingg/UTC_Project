import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Layout from '../../components/templates/Layout';
import ProductDetailContainer from '../../containers/ProductDetails';
import { bookById } from '../../redux/book';
const ProductDetail: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  useEffect(() => {
    if (id) {
      dispatch(bookById(id as string));
    }
  }, [dispatch]);

  return (
    <Layout>
      <ProductDetailContainer />
    </Layout>
  );
};

export default ProductDetail;
