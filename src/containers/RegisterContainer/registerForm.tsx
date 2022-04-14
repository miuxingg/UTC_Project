import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Input from '../../components/elements/Input';
import { useDispatch } from 'react-redux';
import { registerLocal } from '../../redux/auth';
import { unwrapResult } from '@reduxjs/toolkit';
import { ResponseDto } from '../../libs/apis/auth/types';
import { HTTP_STATUS } from '../../configs';
import { useTranslation } from 'react-i18next';

const Schema = Yup.object().shape({
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

const initialValues = {
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
};

const RegisterForm: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
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
    }
  };
  return (
    <Formik
      onSubmit={handleFormSubmit}
      validationSchema={Schema}
      validateOnChange={false}
      initialValues={initialValues}
    >
      {({ handleSubmit, errors, values, handleChange }) => {
        return (
          <div className="col-lg-6 col-12">
            <div className="my__account__wrapper">
              <h3 className="account__title">{t('register.register')}</h3>
              <form onSubmit={handleSubmit}>
                <div className="account__form">
                  <div className="input__box">
                    <label>
                      {t('login.email')} <span>*</span>
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      error={
                        errors.email
                          ? t(errors.email, { field: 'Email' })
                          : null || errorMessage.email || ''
                      }
                    />
                  </div>
                  <div className="input__box">
                    <label>
                      {t('register.first-name')} <span>*</span>
                    </label>
                    <Input
                      type="text"
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                      error={
                        errors.firstName
                          ? t(errors.firstName, {
                              field: t('register.first-name'),
                            })
                          : null || errorMessage.firstName || ''
                      }
                    />
                  </div>
                  <div className="input__box">
                    <label>
                      {t('register.last-name')} <span>*</span>
                    </label>
                    <Input
                      type="text"
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                      error={
                        errors.lastName
                          ? t(errors.lastName, {
                              field: t('register.last-name'),
                            })
                          : null || errorMessage.lastName || ''
                      }
                    />
                  </div>
                  <div className="input__box">
                    <label>
                      {t('password')}
                      <span>*</span>
                    </label>
                    <Input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      value={values.password}
                      error={
                        errors.password
                          ? t(errors.password, { field: t('password') })
                          : null || errorMessage.password || ''
                      }
                    />
                  </div>
                  <div className="input__box">
                    <label>
                      {t('register.comfirm')}
                      <span>*</span>
                    </label>
                    <Input
                      type="password"
                      name="confirmPassword"
                      onChange={handleChange}
                      value={values.confirmPassword}
                      error={
                        errors.confirmPassword
                          ? t(errors.confirmPassword, {
                              field: t('register.comfirm'),
                            })
                          : ''
                      }
                    />
                  </div>
                  <div className="form__btn">
                    <button type="submit">{t('register.submit')}</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default RegisterForm;
