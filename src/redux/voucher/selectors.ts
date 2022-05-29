import { TRootState } from '..';

export const allVoucherSelector = (state: TRootState) => {
  return state?.voucher?.vouchers ?? { total: 0, items: [] };
};
