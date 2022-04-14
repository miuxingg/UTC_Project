import { IAddressApi } from '../../libs/apis/address/types';

export interface IAddressState {
  provinces?: IAddressApi[];
  wards?: IAddressApi[];
  districts?: IAddressApi[];
}
