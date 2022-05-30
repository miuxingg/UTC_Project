// material
import { Stack, Button, Divider, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { loginGoogle } from '../../../redux/auth/action';
import GoogleLoginForm from '../../SocialLoginContainer/Google';
// component
import Iconify from './Iconify';

const clientId =
  '93718062531-2dfmntl4qurferrev6tckg47d5aikc1n.apps.googleusercontent.com';
// ----------------------------------------------------------------------
export const AuthSocial: React.FC = () => {
  const dispatch = useDispatch();
  const handleLoginGoogle = () => {
    // dispatch(loginGoogle());
  };
  return (
    <>
      <GoogleLoginForm clientId={clientId} />
      <Stack direction="row" spacing={2}>
        {/* <Button
          fullWidth
          size="large"
          color="inherit"
          variant="outlined"
          onClick={handleLoginGoogle}
        >
          <Iconify
            icon="eva:google-fill"
            color="#DF3E30"
            width={22}
            height={22}
          />
        </Button> */}

        <Button fullWidth size="large" color="inherit" variant="outlined">
          <Iconify
            icon="eva:facebook-fill"
            color="#1877F2"
            width={22}
            height={22}
          />
        </Button>

        <Button fullWidth size="large" color="inherit" variant="outlined">
          <Iconify
            icon="eva:twitter-fill"
            color="#1C9CEA"
            width={22}
            height={22}
          />
        </Button>
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          OR
        </Typography>
      </Divider>
    </>
  );
};

export default AuthSocial;
