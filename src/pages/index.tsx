/* eslint-disable react/react-in-jsx-scope */
import { NextPage } from 'next';
import Layout from '../components/templates/Layout';
import HomePageContainer from '../containers/HomePageContainer';

const Home: NextPage = () => {
  return (
    <Layout>
      <HomePageContainer />
    </Layout>
  );
};

export default Home;
