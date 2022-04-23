import { createGenericSlice } from '../../libs/utils/createGenericSlice';
import {
  authorized,
  getProfile,
  handleVerifyEmail,
  loginLocal,
  logout,
  registerLocal,
  updateProfile,
} from './action';
import { IAuthState } from './types';

export const initialState: IAuthState = {};

const authSlice = createGenericSlice({
  name: 'auth',
  initialState,
  reducers: {
    setProfile(state, action) {
      state.profile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginLocal.rejected, () => {
      console.error('Login Failed');
    });

    builder.addCase(authorized.fulfilled, (state) => {
      state.isAuthenticated = true;
    });

    builder.addCase(logout.fulfilled, () => initialState);

    builder.addCase(handleVerifyEmail.fulfilled, (state) => {
      state.isVerifyEmailSuccess = true;
    });

    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });

    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
  },
});

export { authorized, handleVerifyEmail, loginLocal, registerLocal };
export const { setProfile } = authSlice.actions;
export default authSlice.reducer;
