import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LoadingButton } from '@mui/lab';

export interface IPopupConfirm {
  open: boolean;
  id?: string;
  onAccept?: () => void;
  onClose?: () => void;
}

export const RemoveConfirm: React.FC<IPopupConfirm> = ({
  open,
  id,
  onAccept,
  onClose,
}) => {
  const { t } = useTranslation();

  return (
    <Dialog onClose={onClose} open={open}>
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
          {t('checkout-history.popup.remove.confirm')}&nbsp;
          <span style={{ fontWeight: 600, fontSize: '18px' }}>{id}</span>
        </Typography>
        <Box my={3}>
          <Grid container spacing={2}>
            <Grid item>
              <LoadingButton
                size="large"
                type="submit"
                variant="contained"
                onClick={onClose}
                sx={{ color: 'white', backgroundColor: '#D92F33' }}
              >
                {t('checkout-history.popup.button.cancel')}
              </LoadingButton>
            </Grid>
            <Grid item>
              <LoadingButton
                size="large"
                type="submit"
                variant="contained"
                onClick={onAccept}
              >
                {t('checkout-history.popup.button.accept')}
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Dialog>
  );
};

export default RemoveConfirm;
