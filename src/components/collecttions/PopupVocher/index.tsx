import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useRef } from 'react';
import VocherCard from './VocherCard';
import { Grid } from '@mui/material';
import { IVoucherApi } from '../../../libs/apis/voucher/types';
import { useTranslation } from 'react-i18next';

interface IPopupVoucher {
  listVoucher: IVoucherApi[];
  onClick?: (value: IVoucherApi) => void;
}
export const PopupVocher: React.FC<IPopupVoucher> = ({
  listVoucher,
  onClick,
}) => {
  const { t } = useTranslation();
  const ref = useRef<any>();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="col-lg-12">
        <div className="wn_checkout_wrap">
          <div className="checkout_info">
            <span>{t('voucher.title')} </span>
            <a
              className="showcoupon"
              style={{ cursor: 'pointer' }}
              onClick={() => ref?.current?.click()}
            >
              {t('voucher.click-here')}
            </a>
          </div>
        </div>
      </div>
      <Button
        ref={ref}
        variant="outlined"
        onClick={handleClickOpen}
        hidden
      ></Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {t('voucher.list-voucher')}
        </DialogTitle>
        <DialogContent style={{ height: '500px', minWidth: '548px' }}>
          <Grid container spacing={2} flexDirection="column">
            {listVoucher.map((item, i) => {
              return (
                <Grid item key={i}>
                  <VocherCard
                    {...item}
                    onClick={(value) => {
                      onClick?.(value);
                      setOpen(false);
                    }}
                  />
                </Grid>
              );
            })}
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PopupVocher;
