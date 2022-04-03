import { styled } from '@mui/material';
import React, { memo } from 'react';
import Typography from '../Typography';

export const Error = styled(Typography)({
  fontSize: '12px',
  marginTop: 8,
  color: 'red',
});

export interface IInput
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  error?: string;
}
const Input: React.FC<IInput> = (props) => {
  return (
    <>
      <input {...props} />
      {props?.error ? <Error>{props?.error}</Error> : null}
    </>
  );
};

export default Input;
