import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Layout from '../../components/templates/Layout';
import { ITEM_PER_PAGE } from '../../configs';
import ProductsContainer from '../../containers/ProductsContainer';
import { getServerSideWithPublicRoute } from '../../libs/hocs/getServerSideWithPublicRoute';
import { BookQueries } from '../../libs/utils/buildQueries';
import { allBooksByFilter, cloudtag } from '../../redux/book';
import { getAllCategory } from '../../redux/categories';
import { getAllPublishers } from '../../redux/publisher';

export const ProductPage: NextPage = () => {
  const router = useRouter();
  const { search } = router.query;
  const dispatch = useDispatch();

  useEffect(() => {
    const queries: BookQueries = { limit: ITEM_PER_PAGE };
    if (search) {
      queries['search'] = search as string;
    }
    dispatch(getAllCategory());
    dispatch(getAllPublishers());
    dispatch(allBooksByFilter({ ...queries }));
    dispatch(cloudtag());
  }, [dispatch]);
  return (
    <Layout>
      <ProductsContainer />
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

export default ProductPage;
