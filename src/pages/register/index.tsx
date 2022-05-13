import { NextPage } from 'next';
import React from 'react';
import Layout from '../../components/templates/Layout';
import { RegisterContainer } from '../../containers/AuthContainer/auth/register';
import { getServerSideWithPublicRoute } from '../../libs/hocs/getServerSideWithPublicRoute';

const Register: NextPage = () => {
  return (
    <Layout>
      {/* <RegisterContainer /> */}
      <RegisterContainer />
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
