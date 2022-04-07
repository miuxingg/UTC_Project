import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';
import { PUBLIC_KEY } from '../../configs/stripe.config';

const stripeTestPromise = loadStripe(PUBLIC_KEY);
const StripeContainer: React.FC = () => {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm />
    </Elements>
  );
};

export default StripeContainer;
