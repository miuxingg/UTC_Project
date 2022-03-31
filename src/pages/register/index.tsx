import { NextPage } from 'next';
import React from 'react';
import Layout from '../../components/templates/Layout';
import RegisterContainer from '../../containers/RegisterContainer';

const Register: NextPage = () => {
  return (
    <Layout>
      <RegisterContainer />
    </Layout>
  );
};

export default Register;
