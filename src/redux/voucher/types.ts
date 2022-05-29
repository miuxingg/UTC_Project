import { IPaginationOutput } from '../../configs/types';
import { IVoucherApi } from '../../libs/apis/voucher/types';

export interface IVoucherState {
  vouchers?: IPaginationOutput<IVoucherApi>;
}
