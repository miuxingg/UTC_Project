import { Box } from '@mui/material';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Input from '../../components/elements/Input';
import * as Yup from 'yup';
import Typography from '../../components/elements/Typography';
import { ButtonSubmit } from './Profile';
import { useDispatch } from 'react-redux';
import { changePassword } from '../../redux/auth/action';
import { unwrapResult } from '@reduxjs/toolkit';
import { setSuccess } from '../../redux/app';

const Schema = Yup.object().shape({
  currentPassword: Yup.string().required('yup.empty'),
  newPassword: Yup.string()
    .required('yup.empty')
    .min(6, 'yup.password.not.length'),
  comfirmPassword: Yup.string()
    .required('yup.empty')
    .min(6, 'yup.password.not.length')
    .oneOf([Yup.ref('newPassword')], 'yup.password.comfirm'),
});

interface IChangePassword {
  onProfileLinkClick?: () => void;
}
const ChangePassword: React.FC<IChangePassword> = ({ onProfileLinkClick }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const initialValues = {
    currentPassword: '',
    newPassword: '',
    comfirmPassword: '',
  };
  const [errorMessage, setErrorMessage] = useState({
    currentPassword: '',
  });
  const handleSubmitForm = async (values: any) => {
    setErrorMessage({ currentPassword: '' });
    const response = await dispatch(
      changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      }),
    );
    const result = unwrapResult(response as any);
    if (result.statusCode && result?.message) {
      setErrorMessage((pre) => {
        return { ...pre, currentPassword: result?.message };
      });
    } else {
      dispatch(setSuccess({ message: t('change-password.success') }));
    }
  };
  return (
    <Box maxWidth={500} margin="auto" my={10}>
      <Formik
        validationSchema={Schema}
        validateOnChange={false}
        initialValues={initialValues}
        onSubmit={handleSubmitForm}
      >
        {({ handleSubmit, errors, values, handleChange, setFieldValue }) => {
          return (
            <form onSubmit={handleSubmit}>
              <div className="customer_details">
                <div className="customar__field">
                  <div className="input_box">
                    <label>
                      {t('change-password.current')} <span>*</span>
                    </label>
                    <Input
                      type="password"
                      name="currentPassword"
                      onChange={handleChange}
                      error={
                        errors?.currentPassword
                          ? t(errors?.currentPassword, {
                              field: t('password'),
                            })
                          : null || t(errorMessage.currentPassword)
                      }
                      value={values.currentPassword}
                    />
                  </div>
                  <div className="input_box">
                    <label>
                      {t('change-password.new')} <span>*</span>
                    </label>
                    <Input
                      type="password"
                      name="newPassword"
                      onChange={handleChange}
                      error={
                        errors.newPassword
                          ? t(errors.newPassword, {
                              field: t('change-password.new'),
                            })
                          : ''
                      }
                      value={values.newPassword}
                    />
                  </div>
                  <div className="input_box">
                    <label>
                      {t('change-password.comfirm')} <span>*</span>
                    </label>
                    <Input
                      type="password"
                      name="comfirmPassword"
                      onChange={handleChange}
                      error={
                        errors.comfirmPassword
                          ? t(errors.comfirmPassword, {
                              field: t('change-password.comfirm'),
                            })
                          : ''
                      }
                      value={values.comfirmPassword}
                    />
                  </div>
                </div>
              </div>
              <Box display="flex" justifyContent="space-between">
                <Typography
                  fontSize="16px"
                  style={{ color: '#7eabd0', cursor: 'pointer' }}
                  onClick={onProfileLinkClick}
                >
                  {t('change-password.link-to-profile')}
                </Typography>
                <ButtonSubmit type="submit">{t('submit.update')}</ButtonSubmit>
              </Box>
            </form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default ChangePassword;
