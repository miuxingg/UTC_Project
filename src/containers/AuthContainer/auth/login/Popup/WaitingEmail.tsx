import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LoadingButton } from '@mui/lab';

export interface IPopupConfirm {
  open: boolean;
  email: string;
  onLoginClick?: () => void;
}

export const WaitingEmail: React.FC<IPopupConfirm> = ({
  open,
  email,
  onLoginClick,
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
        height={300}
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
          {t('forgot-content-1')}
          <span style={{ fontWeight: 600, fontSize: '18px' }}>{email}</span>
          &nbsp;
          {t('forgot-content-2')}
        </Typography>
        <Box my={3}>
          <LoadingButton
            size="large"
            type="submit"
            variant="contained"
            onClick={onLoginClick}
          >
            {t('login.sign-in')}
          </LoadingButton>
        </Box>
      </Box>
    </Dialog>
  );
};

export default WaitingEmail;
