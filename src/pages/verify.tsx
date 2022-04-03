import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { memo, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Layout from '../components/templates/Layout';
import { getServerSideWithPublicRoute } from '../libs/hocs/getServerSideWithPublicRoute';
import { handleVerifyEmail } from '../redux/auth';

const VerifyPage: NextPage = () => {
  const dispatch = useDispatch();
  const {
    push,
    query: { code },
  } = useRouter();
  useEffect(() => {
    dispatch(handleVerifyEmail({ code: String(code) }));
    push('/');
  }, [code]);

  return <></>;
};

export const getServerSideProps = getServerSideWithPublicRoute(
  async (_, store) => {
    return {
      props: {},
    };
  },
);

export default VerifyPage;
