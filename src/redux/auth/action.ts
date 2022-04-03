import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { apiSdk } from '../../libs/apis';
import { IAuthLocal, IVerifyEmail } from '../../libs/apis/auth/types';
import { removeToken, setToken } from '../../libs/utils/token';
import { setError, setSuccess } from '../app';
// import { setError, setSuccess } from '../app';

export const loginLocal = createAsyncThunk(
  'auth/loginLocal',
  async (user: IAuthLocal, { dispatch }) => {
    try {
      const token = await apiSdk.authApis.loginLocal(user);
      setToken(token);
      dispatch(authorized());
      dispatch(setSuccess({ message: 'Login Success' }));
      window?.location.replace('/');
    } catch (err: any) {
      return err;
    }
  },
);

export const registerLocal = createAsyncThunk(
  'auth/registerLocal',
  async (user: IAuthLocal, { dispatch }) => {
    // try {
    return await apiSdk.authApis.registerLocal(user);
    // dispatch(setSuccess({ message: translate('register.success.verify') }));
    // window?.location?.replace('/');
    // } catch (error: any) {
    //   // dispatch(setError({ message: error.message }));
    //   throw error;
    // }
  },
);

export const logout = createAsyncThunk('auth/logout', async () => {
  // await apiSdk.authApis.logout();
  removeToken();
  // window?.location?.replace('/');
});

export const authorized = createAsyncThunk('auth/authorized', () => {
  return {
    payload: {},
  };
});

export const handleVerifyEmail = createAsyncThunk(
  'auth/handleVerifyEmail',
  async (data: IVerifyEmail) => {
    await apiSdk.authApis.verifyEmail(data);
  },
);
