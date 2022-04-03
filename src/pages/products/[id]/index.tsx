import { NextPage } from 'next';
import * as D from 'next/document';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Layout from '../../../components/templates/Layout';
import ProductDetailContainer from '../../../containers/ProductDetails';
import { getServerSideWithPublicRoute } from '../../../libs/hocs/getServerSideWithPublicRoute';
import { bookById, cloudtag } from '../../../redux/book';
import { getAllCategory } from '../../../redux/categories';

const ProductDetail: NextPage = () => {
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
    <>
      {/* <Head>
        <title>Home | Bookshop Responsive Bootstrap4 Template</title>
        <meta name="description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="images/favicon.ico" />
        <link rel="apple-touch-icon" href="images/icon.png" />
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Poppins:300,300i,400,400i,500,600,600i,700,700i,800"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="css/bootstrap.min.css" />
        <link rel="stylesheet" href="css/plugins.css" />
        <link rel="stylesheet" href="style.css" />
        <link rel="stylesheet" href="css/custom.css" />
        <script src="js/vendor/modernizr-3.5.0.min.js"></script>
      </Head> */}

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
