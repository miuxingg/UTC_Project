import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { apiSdk } from '../../libs/apis';

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#c4f0ff',
      color: '#fff',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': { color: '#fce883' },
      '::placeholder': { color: '#87bbfd' },
    },
    invalid: {
      iconColor: '#ffc7ee',
      color: '#ffc7ee',
    },
  },
};

export interface IPaymentStripeForm {
  onClick?: () => void;
}

const PaymentStripeForm: React.FC<IPaymentStripeForm> = ({ onClick }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (stripe && elements) {
      const cardElement = elements.getElement(CardElement);
      if (cardElement) {
        const token = await stripe.createToken(cardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
        });
        if (!error && paymentMethod) {
          try {
            const { id } = paymentMethod;
            const response = await apiSdk.payment.createPayment({
              amount: 100000,
              id,
            });
            console.log(response);

            if (response) {
              console.log('Successful payment');
            }
          } catch (err) {
            console.log('Err: ', err);
          }
        } else {
          console.log(error?.message);
        }
      }
    }
  };

  return (
    <>
      <fieldset className="FormGroup">
        <div className="FormRow">
          <CardElement />
        </div>
      </fieldset>
    </>
  );
};

export default PaymentStripeForm;
