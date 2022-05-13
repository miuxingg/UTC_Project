import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface IPopupConfirm {
  open: boolean;
  email: string;
}

export const PopupWaitingVerify: React.FC<IPopupConfirm> = ({
  open,
  email,
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(open);
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog onClose={handleClose} open={isOpen}>
      <Box
        width={500}
        height={260}
        p="32px 24px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <img
          src="/images/new-mails.jpg"
          style={{ width: '120px', height: '120px' }}
        />
        <Typography align="center">
          {t('register.email-verify-1')}
          <span style={{ fontWeight: 600, fontSize: '18px' }}>{email}</span>
          &nbsp;
          {t('register.email-verify-2')}
        </Typography>
      </Box>
    </Dialog>
  );
};

export default PopupWaitingVerify;
