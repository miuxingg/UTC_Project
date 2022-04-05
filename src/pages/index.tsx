/* eslint-disable react/react-in-jsx-scope */
import { NextPage } from 'next';
import { useEffect } from 'react';
import Layout from '../components/templates/Layout';
import HomePageContainer from '../containers/HomePageContainer';
import { getNewsBook } from '../redux/book';
import { useDispatch } from 'react-redux';
import { getServerSideWithPublicRoute } from '../libs/hocs/getServerSideWithPublicRoute';

const Home: NextPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNewsBook({ limit: 10 }));
  }, [dispatch]);
  return (
    <>
      <Layout>
        <HomePageContainer />
      </Layout>
    </>
  );
};

export const getServerSideProps = getServerSideWithPublicRoute(
  async (ctx, store) => {
    return {
      props: {},
    };
  },
);

export default Home;
