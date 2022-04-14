/* eslint-disable react/react-in-jsx-scope */
import { NextPage } from 'next';
import { useEffect } from 'react';
import Layout from '../components/templates/Layout';
import HomePageContainer from '../containers/HomePageContainer';
import { allBooksByFilter, bookBestSaler, getNewsBook } from '../redux/book';
import { useDispatch, useSelector } from 'react-redux';
import { getServerSideWithPublicRoute } from '../libs/hocs/getServerSideWithPublicRoute';
import { getProfile } from '../redux/auth/action';
import { profileSelector } from '../redux/auth/selectors';

const Home: NextPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNewsBook({ limit: 10 }));
    dispatch(bookBestSaler());
    dispatch(allBooksByFilter({ limit: 20 }));
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
