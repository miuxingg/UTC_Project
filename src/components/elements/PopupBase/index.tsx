import { Box, BoxProps, ClickAwayListener, styled } from '@mui/material';
import React, { memo, useState } from 'react';

const PopupBaseWrap = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  //   margin: 'auto',
  transform: 'translate(-50%, -50%)',
  zIndex: 999,
});

interface IPopupBase extends BoxProps {
  open?: boolean;
  children?: React.ReactNode;
}
export const PopupBase: React.FC<IPopupBase> = (props) => {
  return (
    <>
      {/* {open ? (
        <ClickAwayListener onClickAway={() => setOpen(false)}> */}
      <PopupBaseWrap {...props}>{props?.children}</PopupBaseWrap>
      {/* </ClickAwayListener>
      ) : null} */}
    </>
  );
};

export default PopupBase;
