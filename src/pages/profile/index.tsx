import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/templates/Layout';
import ProfileContainer from '../../containers/ProfileContainer';
import { getServerSideWithProtectedRoute } from '../../libs/hocs/getServerSideWithProtectedRoute';
import {
  getProvices,
  getDistrictsThunk,
  getWardsThunk,
} from '../../redux/address';

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProvices());
    dispatch(getDistrictsThunk(1));
    dispatch(getWardsThunk(1));
  }, [dispatch]);
  return (
    <Layout>
      <ProfileContainer />
    </Layout>
  );
};

export const getServerSideProps = getServerSideWithProtectedRoute(
  async (ctx, store) => {
    return {
      props: {},
    };
  },
);

export default Profile;
