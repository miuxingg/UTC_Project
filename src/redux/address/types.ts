import { IAddressApi } from '../../libs/apis/address/types';

export interface IAddressState {
  provices?: IAddressApi[];
  wards?: IAddressApi[];
  districts?: IAddressApi[];
}
