import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Layout from '../../components/templates/Layout';
import { ITEM_PER_PAGE } from '../../configs';
import ProductsContainer from '../../containers/ProductsContainer';
import { BookQueries } from '../../libs/utils/buildQueries';
import { allBooksByFilter } from '../../redux/book';
import { getAllCategory } from '../../redux/categories';

export const ProductPage: React.FC = () => {
  const router = useRouter();
  const { search } = router.query;
  const dispatch = useDispatch();
  useEffect(() => {
    const queries: BookQueries = { limit: ITEM_PER_PAGE };
    if (search) {
      queries['search'] = search as string;
    }
    dispatch(getAllCategory());
    dispatch(allBooksByFilter({ ...queries }));
  }, []);
  return (
    <Layout>
      <ProductsContainer />
    </Layout>
  );
};

export default ProductPage;
