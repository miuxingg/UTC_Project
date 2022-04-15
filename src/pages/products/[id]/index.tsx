import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Layout from '../../../components/templates/Layout';
import { REVIEW_COUNT } from '../../../configs';
import ProductDetailContainer from '../../../containers/ProductDetails';
import { getServerSideWithPublicRoute } from '../../../libs/hocs/getServerSideWithPublicRoute';
import { bookById, cloudtag } from '../../../redux/book';
import { getAllCategory } from '../../../redux/categories';
import { getAllReviewOnBook } from '../../../redux/review';

const ProductDetail: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  useEffect(() => {
    if (id) {
      dispatch(bookById(id as string));
      dispatch(getAllCategory());
      dispatch(cloudtag());
      dispatch(
        getAllReviewOnBook({
          idBook: String(id),
          queries: { limit: REVIEW_COUNT },
        }),
      );
    }
  }, [dispatch, id]);

  return (
    <>
      <Layout>
        <ProductDetailContainer />
      </Layout>
    </>
  );
};

export const getServerSideProps = getServerSideWithPublicRoute(
  async (_, store) => {
    return {
      props: {},
    };
  },
);

export default ProductDetail;
