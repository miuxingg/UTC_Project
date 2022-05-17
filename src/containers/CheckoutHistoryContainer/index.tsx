import { Check } from '@mui/icons-material';
import {
  Box,
  Container,
  Paper,
  Step,
  StepConnector,
  stepConnectorClasses,
  StepIconProps,
  StepLabel,
  Stepper,
  styled,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { memo, useEffect, useState } from 'react';
import empty from './empty.png';

import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import HistoryLine from './HistoryLine';
import { useDispatch, useSelector } from 'react-redux';
import { allOrdersByStatusSelector } from '../../redux/order/selectors';
import { transfromOrderHistory } from '../../redux/order/dto';
import { IOrderStatus } from '../../libs/apis/order/types';
import { getOrderByStatus } from '../../redux/order';
import { useTranslation } from 'react-i18next';

const Empty = styled(Box)(({ img }: { img: string }) => ({
  backgroundImage: `url('${img}')`,
}));

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
    4: <VideoLabelIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = [
  { key: 0, value: 'checkout-history.table.pending' },
  { key: 1, value: 'checkout-history.table.shipping' },
  { key: 2, value: 'checkout-history.table.success' },
  { key: 3, value: 'checkout-history.table.delete' },
];

const statusMapping = (key: number) => {
  switch (key) {
    case 0:
      return IOrderStatus.Pending;
    case 1:
      return IOrderStatus.Shipping;
    case 2:
      return IOrderStatus.Success;
    case 3:
      return IOrderStatus.Rejected;
    default:
      return IOrderStatus.Pending;
  }
};

const CheckoutHistoryContainer: React.FC = memo(() => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [step, setStep] = useState<number>(0);
  // const [queries, setQueries] = useState<IOrderStatus>(IOrderStatus.Pending);
  const orderHistory = useSelector(allOrdersByStatusSelector);
  useEffect(() => {
    dispatch(getOrderByStatus({ status: statusMapping(step) }));
  }, [step]);
  return (
    <Box mb={10}>
      <Container>
        <Box mt={10} mb={4}>
          <Stepper
            alternativeLabel
            activeStep={step}
            connector={<ColorlibConnector />}
          >
            {steps.map(({ key, value }) => (
              <Step key={key} onClick={() => setStep(key)}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>
                  {t(value)}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <Box width="100%" my={4} style={{ backgroundColor: '#eee' }}>
          {orderHistory?.total ? (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>{t('checkout-history.table.stt')}</TableCell>
                    <TableCell align="center">
                      {t('checkout-history.table.id')}
                    </TableCell>
                    <TableCell align="center">
                      {t('checkout-history.table.date')}
                    </TableCell>
                    <TableCell align="center">
                      {t('checkout-history.table.address')}
                    </TableCell>
                    <TableCell align="center">
                      {t('checkout-history.table.total-amount')}
                    </TableCell>
                    {statusMapping(step) !== IOrderStatus.Pending ? null : (
                      <TableCell align="center">
                        {t('checkout-history.table.action')}
                      </TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <HistoryLine
                  lines={transfromOrderHistory(orderHistory?.items || [])}
                  status={statusMapping(step)}
                />
              </Table>
            </TableContainer>
          ) : (
            <Box display="flex" justifyContent="center" py={2}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <img src="/images/empty.png" alt="" />
                <span>{t('checkout-history.table.empty')}</span>
              </Box>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
});

export default CheckoutHistoryContainer;
