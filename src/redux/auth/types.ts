import { IProfile } from '../../libs/apis/auth/types';

export interface IAuthState {
  isAuthenticated?: boolean;
  profile?: IProfile;
  isVerifyEmailSuccess?: boolean;
  isResetPasswordSuccess?: boolean;
  isUpdateProfileSuccess?: boolean;
}
