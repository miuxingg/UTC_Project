import { NextPage } from 'next';
import React from 'react';
import Layout from '../../components/templates/Layout';
import LoginContainer from '../../containers/LoginContainer';
import { getServerSideWithPublicRoute } from '../../libs/hocs/getServerSideWithPublicRoute';

const Register: NextPage = () => {
  return (
    <Layout>
      <LoginContainer />
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
export default Register;
