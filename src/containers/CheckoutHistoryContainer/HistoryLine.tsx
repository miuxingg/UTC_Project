import * as React from 'react';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { moneyFormat } from '../../libs/utils';
import dayjs from 'dayjs';
import {
  Box,
  Collapse,
  IconButton,
  styled,
  Table,
  TableHead,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useTranslation } from 'react-i18next';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IOrderStatus } from '../../libs/apis/order/types';
import RemoveConfirm from './Popup/RemoveComfirm';
import { useDispatch } from 'react-redux';
import { updateOrderStatusThunk } from '../../redux/order';

const IconButtonMui = styled(IconButton)({
  ':focus': {
    outline: 'none',
  },
});

interface IHistoryBookDetail {
  id: string;
  thumbnail: string;
  name: string;
  price: number;
  author: string;
  quantity: number;
}

export interface IHistoryBookLine {
  stt?: number;
  id: string;
  createdAt: Date;
  address: string;
  total: number;
  status?: IOrderStatus;
  books: IHistoryBookDetail[];
}

const Row: React.FC<IHistoryBookLine> = ({
  id,
  createdAt,
  address,
  total,
  books,
  stt,
  status,
}) => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [openPopup, setOpenPopup] = React.useState<boolean>(false);
  const [currentId, setCurrentId] = React.useState<string>('');
  const handleAcceptRemove = () => {
    dispatch(
      updateOrderStatusThunk({ id: currentId, status: IOrderStatus.Rejected }),
    );
    setOpenPopup(false);
  };
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButtonMui
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButtonMui>
        </TableCell>
        <TableCell component="th" scope="row">
          {stt}
        </TableCell>
        <TableCell align="center">{id}</TableCell>
        <TableCell align="center">
          {dayjs(createdAt).format('DD/MM/YYYY')}
        </TableCell>
        <TableCell align="center">{address}</TableCell>
        <TableCell align="center">{moneyFormat(total)}</TableCell>
        {status === IOrderStatus.Pending ? (
          <TableCell align="center">
            <IconButtonMui
              onClick={() => {
                setOpenPopup(true);
                setCurrentId(id);
              }}
            >
              <DeleteForeverIcon style={{ color: 'red' }} />
            </IconButtonMui>
          </TableCell>
        ) : null}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }} my={5}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      {t('checkout-history.table.image')}
                    </TableCell>
                    <TableCell align="center">
                      {t('checkout-history.table.name')}
                    </TableCell>
                    <TableCell align="center">
                      {t('checkout-history.table.author')}
                    </TableCell>
                    <TableCell align="center">
                      {t('checkout-history.table.quantity')}
                    </TableCell>
                    <TableCell align="center">
                      {t('checkout-history.table.amount')}
                    </TableCell>
                    {/* <TableCell align="right">Total price ($)</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {books.map((book, i) => (
                    <TableRow key={i}>
                      <TableCell align="center">
                        <img
                          src={book.thumbnail}
                          style={{ width: 50, height: 70 }}
                        />
                      </TableCell>
                      <TableCell align="center">{book.name}</TableCell>
                      <TableCell align="center">{book.author}</TableCell>
                      <TableCell align="center">{book.quantity}</TableCell>
                      <TableCell align="center">
                        {moneyFormat(book.price)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      {openPopup ? (
        <RemoveConfirm
          open={true}
          id={currentId}
          onAccept={handleAcceptRemove}
          onClose={() => {
            setOpenPopup(false);
          }}
        ></RemoveConfirm>
      ) : null}
    </React.Fragment>
  );
};

interface IHistoryBook {
  lines: IHistoryBookLine[];
  status: IOrderStatus;
}
export const HistoryLine: React.FC<IHistoryBook> = ({ lines, status }) => {
  return (
    <>
      <TableBody>
        {lines.map((item, i) => {
          return <Row {...item} key={i} status={status} />;
        })}
      </TableBody>
    </>
  );
};

export default HistoryLine;
