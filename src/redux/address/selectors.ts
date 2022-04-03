import { TRootState } from '..';
import { IAddressApi } from '../../libs/apis/address/types';

export const getProvices = (state: TRootState): IAddressApi[] => {
  return state.address?.provices ?? [];
};

export const getDistricts = (state: TRootState): IAddressApi[] => {
  return state.address?.districts ?? [];
};

export const getWards = (state: TRootState): IAddressApi[] => {
  return state.address?.wards ?? [];
};
