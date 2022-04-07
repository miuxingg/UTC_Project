import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { PUBLIC_KEY } from '../configs/stripe.config';

const stripeTestPromise = loadStripe(PUBLIC_KEY);
const StripeContainerWrapper: React.FC = ({ children }) => {
  return <Elements stripe={stripeTestPromise}>{children}</Elements>;
};

export default StripeContainerWrapper;
