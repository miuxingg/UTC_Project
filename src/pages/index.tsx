/* eslint-disable react/react-in-jsx-scope */
import { NextPage } from 'next';
import { useEffect } from 'react';
import Layout from '../components/templates/Layout';
import HomePageContainer from '../containers/HomePageContainer';
import {
  allBooksByFilter,
  bookBestSaler,
  getBookByCombos,
  getNewsBook,
} from '../redux/book';
import { useDispatch } from 'react-redux';
import { getServerSideWithPublicRoute } from '../libs/hocs/getServerSideWithPublicRoute';
import { BookStatus } from '../libs/utils/buildQueries';
import { apiSdk } from '../libs/apis';
import { getAllBlog } from '../redux/blog';

const Home: NextPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNewsBook({ limit: 20, status: BookStatus.NEW }));
    dispatch(bookBestSaler());
    dispatch(allBooksByFilter({ limit: 20 }));
    dispatch(getBookByCombos({ limit: 20 }));
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
    const blog = await apiSdk.blogApi.getAllBlog({ limit: 3 });
    store.dispatch(getAllBlog(blog));
    return {
      props: {},
    };
  },
);

export default Home;
