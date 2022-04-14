import { TRootState } from '..';
import { IAddressApi } from '../../libs/apis/address/types';

export const getProvinces = (state: TRootState): IAddressApi[] => {
  return state.address?.provinces ?? [];
};

export const getDistricts = (state: TRootState): IAddressApi[] => {
  return state.address?.districts ?? [];
};

export const getWards = (state: TRootState): IAddressApi[] => {
  return state.address?.wards ?? [];
};
