/* eslint-disable react/react-in-jsx-scope */
import { NextPage } from 'next';
import { useEffect } from 'react';
import Layout from '../components/templates/Layout';
import HomePageContainer from '../containers/HomePageContainer';
import { getNewsBook } from '../redux/book';
import { useDispatch } from 'react-redux';

const Home: NextPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNewsBook({ limit: 10 }));
  }, [dispatch]);
  return (
    <Layout>
      <HomePageContainer />
    </Layout>
  );
};

export default Home;
