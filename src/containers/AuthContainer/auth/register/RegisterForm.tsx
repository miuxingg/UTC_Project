import * as Yup from 'yup';
import { useState } from 'react';
import { Form, Formik } from 'formik';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../Iconify';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { HTTP_STATUS } from '../../../../configs';
import { registerLocal } from '../../../../redux/auth';
import { ResponseDto } from '../../../../libs/apis/auth/types';
import PopupWaitingVerify from './PopupWaitingVerify';

// ----------------------------------------------------------------------

export const RegisterForm: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isPopupVerifyEmail, setIsPopupVerifyEmail] = useState<boolean>(false);

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    email: Yup.string().required('yup.empty'),
    firstName: Yup.string().required('yup.empty'),
    lastName: Yup.string().required('yup.empty'),
    password: Yup.string()
      .required('yup.empty')
      .min(6, 'yup.password.not.length'),
    confirmPassword: Yup.string()
      .required('yup.empty')
      .oneOf([Yup.ref('password')], 'yup.password.comfirm'),
  });

  const [errorMessage, setErrorMessage] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  };

  const handleFormSubmit = async (values: any) => {
    const profileResult = await dispatch(
      registerLocal({
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
      }),
    );
    const originalProfileResult: ResponseDto = unwrapResult(
      profileResult as any,
    );

    if (originalProfileResult.statusCode === HTTP_STATUS.BAD_REQUEST) {
      setErrorMessage((pre) => {
        return {
          ...pre,
          [originalProfileResult.field!]: originalProfileResult.message,
        };
      });
    } else {
      setIsPopupVerifyEmail(true);
    }
  };

  return (
    <>
      <Formik
        onSubmit={handleFormSubmit}
        validationSchema={RegisterSchema}
        validateOnChange={false}
        initialValues={initialValues}
      >
        {({ handleSubmit, errors, values, handleChange }) => {
          return (
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    label="First name"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    helperText={
                      <span style={{ color: 'red' }}>
                        {errors.firstName
                          ? t(errors.firstName, {
                              field: t('register.first-name'),
                            })
                          : null || errorMessage.firstName || ''}
                      </span>
                    }
                  />

                  <TextField
                    fullWidth
                    label="Last name"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    helperText={
                      <span style={{ color: 'red' }}>
                        {errors.lastName
                          ? t(errors.lastName, {
                              field: t('register.last-name'),
                            })
                          : null || errorMessage.lastName || ''}
                      </span>
                    }
                  />
                </Stack>

                <TextField
                  fullWidth
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  label="Email address"
                  helperText={
                    <span style={{ color: 'red' }}>
                      {errors.email
                        ? t(errors.email, { field: 'Email' })
                        : null || errorMessage.email || ''}
                    </span>
                  }
                />

                <TextField
                  fullWidth
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
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
                      {errors.password
                        ? t(errors.password, { field: t('password') })
                        : null || errorMessage.password || ''}
                    </span>
                  }
                />

                <TextField
                  fullWidth
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
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
                      {errors.confirmPassword
                        ? t(errors.confirmPassword, {
                            field: t('register.comfirm'),
                          })
                        : ''}
                    </span>
                  }
                />

                <LoadingButton
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  {t('register.submit')}
                </LoadingButton>
              </Stack>
              {isPopupVerifyEmail ? (
                <PopupWaitingVerify open={true} email={values.email} />
              ) : null}
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default RegisterForm;
