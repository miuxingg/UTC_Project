import { Typography as MuiTypography, TypographyProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

const Typo = styled(MuiTypography)({
  fontFamily: 'Roboto',
});
const Typograhy: React.FC<TypographyProps> = ({ children, ...props }) => {
  return <Typo {...props}>{children}</Typo>;
};

export default React.memo(Typograhy);
