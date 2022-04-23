import {
  Box,
  Paper,
  styled,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';
import PopupBase from '../../components/elements/PopupBase';
import HistoryLine from './HistoryLine';

const TableDetail: React.FC = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Stt</TableCell>
            <TableCell align="center">Mã đơn hàng</TableCell>
            <TableCell align="center">Ngày tạo</TableCell>
            <TableCell align="center">Địa chỉ nhận</TableCell>
            <TableCell align="center">Thành tiền</TableCell>
          </TableRow>
        </TableHead>
        <HistoryLine />
      </Table>
    </TableContainer>
  );
};

const HistoryDetail: React.FC = () => {
  return (
    // <PopupBase
    //   width={900}
    //   height={300}
    //   style={{ backgroundColor: '#eee' }}
    //   open={true}
    // >
    //   hello
    // </PopupBase>
    <></>
  );
};

export default HistoryDetail;
