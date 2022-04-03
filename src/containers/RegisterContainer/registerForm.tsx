import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Input from '../../components/elements/Input';
import { useDispatch } from 'react-redux';
import { registerLocal } from '../../redux/auth';
import { unwrapResult } from '@reduxjs/toolkit';
import { ResponseDto } from '../../libs/apis/auth/types';
import { HTTP_STATUS } from '../../configs';

const Schema = Yup.object().shape({
  email: Yup.string().required('Email không được để trống'),
  password: Yup.string()
    .required('Mật khẩu không được để trống')
    .min(6, 'Mật khẩu quá ngắn'),
  confirmPassword: Yup.string()
    .required('Xác nhận mật khẩu không được để trống')
    .oneOf([Yup.ref('password')], 'Xác nhận mật khẩu không chính xác'),
});

const initialValues = { email: '', password: '', confirmPassword: '' };

const RegisterForm: React.FC = () => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState({
    email: '',
    password: '',
  });
  const handleFormSubmit = async (values: any) => {
    const profileResult = await dispatch(
      registerLocal({ email: values.email, password: values.password }),
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
              <h3 className="account__title">Register</h3>
              <form onSubmit={handleSubmit}>
                <div className="account__form">
                  <div className="input__box">
                    <label>
                      Email <span>*</span>
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      error={errors.email || errorMessage.email || ''}
                    />
                  </div>
                  <div className="input__box">
                    <label>
                      Mật khẩu<span>*</span>
                    </label>
                    <Input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      value={values.password}
                      error={errors.password || errorMessage.password || ''}
                    />
                  </div>
                  <div className="input__box">
                    <label>
                      Xác nhận mật khẩu<span>*</span>
                    </label>
                    <Input
                      type="password"
                      name="confirmPassword"
                      onChange={handleChange}
                      value={values.confirmPassword}
                      error={errors.confirmPassword}
                    />
                  </div>
                  <div className="form__btn">
                    <button type="submit">Đăng kí</button>
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
