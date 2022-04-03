import { NextPage } from 'next';
import React from 'react';
import Layout from '../../components/templates/Layout';
import RegisterContainer from '../../containers/RegisterContainer';
import { getServerSideWithPublicRoute } from '../../libs/hocs/getServerSideWithPublicRoute';

const Register: NextPage = () => {
  return (
    <Layout>
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
