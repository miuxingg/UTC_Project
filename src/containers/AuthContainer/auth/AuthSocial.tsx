// material
import { Stack, Button, Divider, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { loginGoogle } from '../../../redux/auth/action';
// component
import Iconify from './Iconify';

// ----------------------------------------------------------------------
export const AuthSocial: React.FC = () => {
  const dispatch = useDispatch();
  const handleLoginGoogle = () => {
    dispatch(loginGoogle());
  };
  return (
    <>
      <Stack direction="row" spacing={2}>
        <Button
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
        </Button>

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
