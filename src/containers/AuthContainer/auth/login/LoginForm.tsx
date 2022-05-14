import * as Yup from 'yup';
import { useState } from 'react';
// import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../Iconify';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { loginLocal } from '../../../../redux/auth';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------
const LoginSchema = Yup.object().shape({
  email: Yup.string().required('yup.empty'),
  password: Yup.string()
    .required('yup.empty')
    .min(6, 'yup.password.not.length'),
});

interface ILoginForm {
  onForgotPassword?: () => void;
}
export const LoginForm: React.FC<ILoginForm> = ({ onForgotPassword }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState({
    email: '',
    password: '',
  });

  const initialValues = {
    email: '',
    password: '',
    remember: true,
  };

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleFormSubmit = async (values: any) => {
    setErrorMessage({
      email: '',
      password: '',
    });

    const profileResult = await dispatch(
      loginLocal({ email: values.email, password: values.password }),
    );
    const originalProfileResult: any = unwrapResult(profileResult as any);
    if (originalProfileResult) {
      setErrorMessage((pre) => {
        return {
          ...pre,
          [originalProfileResult.field]: originalProfileResult.message,
        };
      });
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      validationSchema={LoginSchema}
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
                      t(errorMessage.email)}
                  </span>
                }
                value={values.email}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                type={showPassword ? 'text' : 'password'}
                label="Password"
                name="password"
                FormHelperTextProps={{
                  classes: {
                    root: `{ color: 'red' }`,
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword} edge="end">
                        <Iconify
                          icon={
                            showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'
                          }
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                helperText={
                  <span style={{ color: 'red' }}>
                    {t(errors?.password ?? '', { field: t('password') }) ||
                      t(errorMessage.password)}
                  </span>
                }
                value={values.password}
                onChange={handleChange}
              />
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ my: 2 }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                  // {...getFieldProps('remember')}
                  // checked={values.remember}
                  />
                }
                label={String(t('login.remember'))}
              />

              <a onClick={onForgotPassword} style={{ cursor: 'pointer' }}>
                {t('login.lost-password')}
              </a>
            </Stack>

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              {t('login.sign-in')}
            </LoadingButton>
          </Form>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
