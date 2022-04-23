import React, { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Layout from '../../components/templates/Layout';
import CheckoutHistoryContainer from '../../containers/CheckoutHistoryContainer';
import { IOrderStatus } from '../../libs/apis/order/types';
import { getOrderByStatus } from '../../redux/order';

const CheckoutHistort: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderByStatus({ status: IOrderStatus.Pending }));
  }, [dispatch]);
  return (
    <Layout>
      <CheckoutHistoryContainer />
    </Layout>
  );
};

export default CheckoutHistort;
