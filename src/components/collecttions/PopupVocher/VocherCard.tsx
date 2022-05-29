import { Box, Button as ButonMui, styled } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { IVoucherApi } from '../../../libs/apis/voucher/types';
import { moneyFormat } from '../../../libs/utils';
import Typography from '../../elements/Typography';

const Wrapper = styled(Box)({
  width: '500px',
  height: '130px',
  display: 'flex',
  flexDirection: 'column',
  padding: '10px 24px',
  justifyContent: 'space-between',
  border: '1px solid #eee',
});

const Button = styled(ButonMui)({
  height: '30px',
  width: '120px',
  backgroundColor: '#e59285',
  borderRadius: '5px',
  fontSize: '12px',
  color: '#fff',
  padding: '2px 20px 0',
  fontWeight: 700,
  '&:hover': {
    backgroundColor: '#e59285',
  },
  '&:focus': {
    outline: 'none',
  },
});

interface IVoucherCard extends IVoucherApi {
  onClick?: (value: IVoucherApi) => void;
}

const VocherCard: React.FC<IVoucherCard> = ({
  id,
  name,
  priceDiscound,
  startDate,
  endDate,
  onClick,
}) => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <Typography fontSize="16px" fontWeight="700" style={{ color: '#e59285' }}>
        {name}
      </Typography>
      <Typography fontSize="14px" fontWeight="500">
        {moneyFormat(priceDiscound)}
      </Typography>
      <Typography fontSize="12px">
        {t('voucher.expire')}: {t('voucher.expire-from')}
        <span style={{ fontWeight: 600, fontSize: '13px' }}>
          {dayjs(startDate).format('DD/MM/YYYY HH:mm')}
        </span>{' '}
        {t('voucher.expire-to')}{' '}
        <span style={{ fontWeight: 600, fontSize: '13px' }}>
          {dayjs(endDate).format('DD/MM/YYYY HH:mm')}
        </span>
      </Typography>
      <Box display="flex" justifyContent="flex-end">
        <Button
          onClick={() => {
            onClick?.({ id, name, priceDiscound, startDate, endDate });
          }}
        >
          {t('voucher.submit')}
        </Button>
      </Box>
    </Wrapper>
  );
};

export default VocherCard;
