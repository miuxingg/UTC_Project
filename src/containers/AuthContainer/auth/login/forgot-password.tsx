import * as Yup from 'yup';
import { useState } from 'react';
// import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
// material
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { loginLocal } from '../../../../redux/auth';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Routers } from '../../../../configs/navigator';
import { forgotPassword } from '../../../../redux/auth/action';
import PopupWaitingVerify from '../register/PopupWaitingVerify';
import WaitingEmail from './Popup/WaitingEmail';

// ----------------------------------------------------------------------
const ForgotSchema = Yup.object().shape({
  email: Yup.string().required('yup.empty'),
});
interface IForgotPassword {
  onLoginClick?: () => void;
}
const ForgotPassword: React.FC<IForgotPassword> = ({ onLoginClick }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const initialValues = {
    email: '',
  };

  const [error, setError] = useState({
    email: '',
  });

  const handleFormSubmit = async (values: any) => {
    setError({ email: '' });
    const profileResult = await dispatch(
      forgotPassword({ email: values.email }),
    );
    const originalProfileResult: any = unwrapResult(profileResult as any);
    if (originalProfileResult?.message) {
      setError((pre) => {
        return { ...pre, email: originalProfileResult?.message };
      });
    } else {
      setIsOpen(true);
    }
  };
  return (
    <Formik
      onSubmit={handleFormSubmit}
      validationSchema={ForgotSchema}
      validateOnChange={false}
      initialValues={initialValues}
    >
      {({ handleSubmit, errors, values, handleChange, isSubmitting }) => {
        return (
          <Form noValidate onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                type="email"
                name="email"
                label="Email address"
                helperText={
                  <span style={{ color: 'red' }}>
                    {t(errors?.email ?? '', { field: 'Email' }) ||
                      t(error?.email)}
                  </span>
                }
                value={values.email}
                onChange={handleChange}
              />
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ my: 2 }}
            >
              <a onClick={onLoginClick} style={{ cursor: 'pointer' }}>
                {t('login.sign-in')}
              </a>

              <Link href={Routers.register.path}>
                <a>{t('register.register')}</a>
              </Link>
            </Stack>

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              {t('login.forgot-password-button')}
            </LoadingButton>
            {isOpen ? (
              <WaitingEmail
                open={isOpen}
                email={values.email}
                onLoginClick={() => {
                  setIsOpen(false);
                  onLoginClick?.();
                }}
              />
            ) : null}
          </Form>
        );
      }}
    </Formik>
  );
};

export default ForgotPassword;
