import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Layout from '../../components/templates/Layout';
import CheckoutContainer from '../../containers/CheckoutContainer';
import StripeContainer from '../../containers/Payment/StripeContainer';
import StripeContainerWrapper from '../../containers/StripeContainer';
import { getServerSideWithPublicRoute } from '../../libs/hocs/getServerSideWithPublicRoute';
import {
  getDistrictsThunk,
  getProvices,
  getWardsThunk,
} from '../../redux/address';

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
    return {
      props: {},
    };
  },
);
export default CheckOutPage;
