import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Layout from '../../components/templates/Layout';
import ProductDetailContainer from '../../containers/ProductDetails';
import { bookById, cloudtag } from '../../redux/book';
import { getAllCategory, getCategoryByIds } from '../../redux/categories';
const ProductDetail: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  useEffect(() => {
    if (id) {
      dispatch(bookById(id as string));
      dispatch(getAllCategory());
      dispatch(cloudtag());
    }
  }, [dispatch]);

  return (
    <Layout>
      <ProductDetailContainer />
    </Layout>
  );
};

export default ProductDetail;
