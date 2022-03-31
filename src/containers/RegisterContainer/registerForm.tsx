import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Input from '../../components/elements/Input';

const Schema = Yup.object().shape({
  email: Yup.string().required('Email không được để trống'),
  password: Yup.string().required('Mật khẩu không được để trống'),
  confirmPassword: Yup.string().required(
    'Xác nhận mật khẩu không được để trống',
  ),
});

const initialValues = { email: '', password: '', confirmPassword: '' };

const LoginForm: React.FC = () => {
  const handleFormSubmit = (values: any) => {
    console.log(values);
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
                      error={errors.email}
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
                      error={errors.password}
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

export default LoginForm;
