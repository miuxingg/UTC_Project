import { NextPage } from 'next';
import React from 'react';
import Layout from '../../components/templates/Layout';
import LoginContainer from '../../containers/AuthContainer/auth/login';
import { getServerSideWithPublicRoute } from '../../libs/hocs/getServerSideWithPublicRoute';

const Register: NextPage = () => {
  return (
    <Layout>
      {/* <LoginContainer /> */}
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
