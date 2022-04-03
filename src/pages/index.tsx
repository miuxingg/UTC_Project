/* eslint-disable react/react-in-jsx-scope */
import { NextPage } from 'next';
import { useEffect } from 'react';
import Layout from '../components/templates/Layout';
import HomePageContainer from '../containers/HomePageContainer';
import { getNewsBook } from '../redux/book';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../redux/auth/selectors';
import { getServerSideWithPublicRoute } from '../libs/hocs/getServerSideWithPublicRoute';
import { getCookies } from '../libs/utils/cookies';
import { COOKIE_KEYS } from '../configs';
import { authorized } from '../redux/auth/action';

const Home: NextPage = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(authSelector);
  // console.log(isAuthenticated);

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
