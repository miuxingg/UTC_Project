import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Layout from '../../components/templates/Layout';
import CheckoutContainer from '../../containers/CheckoutContainer';
import StripeContainer from '../../containers/Payment/StripeContainer';
import StripeContainerWrapper from '../../containers/StripeContainer';
import { apiSdk } from '../../libs/apis';
import { getServerSideWithPublicRoute } from '../../libs/hocs/getServerSideWithPublicRoute';
import {
  getDistrictsThunk,
  getProvices,
  getWardsThunk,
} from '../../redux/address';
import { setProfile } from '../../redux/auth';

const CheckOutPage: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProvices());
    dispatch(getDistrictsThunk(1));
    dispatch(getWardsThunk(1));
  }, [dispatch]);
  return (
    <Layout>
      <StripeContainerWrapper>
        <CheckoutContainer />
      </StripeContainerWrapper>
    </Layout>
  );
};

export const getServerSideProps = getServerSideWithPublicRoute(
  async (_, store) => {
    // store.dispatch(getProvices());
    // store.dispatch(getProvices);
    // store.dispatch(getProvices);

    const profile = await apiSdk.authApis.getProfile();
    store.dispatch(setProfile(profile));
    return {
      props: {},
    };
  },
);
export default CheckOutPage;
