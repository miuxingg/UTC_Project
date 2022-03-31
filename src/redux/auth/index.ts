import { createGenericSlice } from '../../libs/utils/createGenericSlice';
import {
  authorized,
  handleVerifyEmail,
  loginLocal,
  logout,
  registerLocal,
} from './action';
import { IAuthState } from './types';

export const initialState: IAuthState = {
  isUpdateProfileSuccess: false,
};

const authSlice = createGenericSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginLocal.rejected, () => {
      console.error('Login Failed');
    });

    builder.addCase(authorized, (state) => {
      state.isAuthenticated = true;
    });

    builder.addCase(logout.fulfilled, () => initialState);

    builder.addCase(handleVerifyEmail.fulfilled, (state) => {
      state.isVerifyEmailSuccess = true;
    });
  },
});

export { authorized, handleVerifyEmail, loginLocal, registerLocal };
export default authSlice.reducer;
