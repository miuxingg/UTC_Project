// @mui
import { styled } from '@mui/material/styles';
import { Card, Container, Typography } from '@mui/material';
import LoginForm from './LoginForm';
import AuthSocial from '../AuthSocial';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import ForgotPassword from './forgot-password';

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export const LoginContainer: React.FC = () => {
  const { t } = useTranslation();
  const [isForgot, setIsForgot] = useState<boolean>(false);
  return (
    <RootStyle>
      <SectionStyle>
        <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
          Hi, Welcome Back
        </Typography>
        <img src="/images/illustration_login.png" alt="login" />
      </SectionStyle>

      <Container maxWidth="sm">
        <ContentStyle>
          <Typography variant="h4" gutterBottom>
            {isForgot ? t('forgot-password') : t('login.sign-in')}
          </Typography>

          <Typography sx={{ color: 'text.secondary', mb: 5 }}>
            {/* Enter your details below. */}
          </Typography>

          <AuthSocial />
          {isForgot ? (
            <ForgotPassword onLoginClick={() => setIsForgot(false)} />
          ) : (
            <LoginForm onForgotPassword={() => setIsForgot(true)} />
          )}
        </ContentStyle>
      </Container>
    </RootStyle>
  );
};

export default LoginContainer;
