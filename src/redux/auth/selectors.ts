import { TRootState } from '..';
import { IProfile } from '../../libs/apis/auth/types';

export const authSelector = (state: TRootState): boolean => {
  return !!state.auth.isAuthenticated;
};

export const profileSelector = (state: TRootState): IProfile | undefined =>
  state.auth.profile;

export const isResetPasswordSuccess = (
  state: TRootState,
): boolean | undefined => state.auth.isResetPasswordSuccess;

export const isUpdateProfileSuccess = (
  state: TRootState,
): boolean | undefined => state.auth.isUpdateProfileSuccess;

export const isVerifySuccess = (state: TRootState): boolean | undefined =>
  state.auth.isVerifyEmailSuccess;
