import { Box, styled } from '@mui/material';
import React, { useState } from 'react';

export const WrapperName = styled(Box)({
  width: '100%',
  height: 44,
  background: '#f4f4f4 none repeat scroll 0 0',
  display: 'block',
  padding: '10px 15px',
  fontWeight: 600,
  cursor: 'pointer',
  transition: '0.5s',
});

export const Detail = styled(Box)({
  width: '100%',
  padding: '10px 12px',
  transition: '0.5s',
});

export interface IPaymentGatewayCart {
  name: string;
  content: React.ReactNode;
  onChange: (state: boolean) => void;
}

export const PaymentGatewayCart: React.FC<IPaymentGatewayCart> = ({
  name,
  content,
  onChange,
}) => {
  const [detail, setDetail] = useState<boolean>(false);
  return (
    <Box width={570}>
      <WrapperName
        onClick={() => {
          setDetail((pre) => !pre);
          onChange(!detail);
        }}
      >
        {name}
      </WrapperName>
      {detail ? <Detail>{content}</Detail> : null}
    </Box>
  );
};

export default PaymentGatewayCart;
