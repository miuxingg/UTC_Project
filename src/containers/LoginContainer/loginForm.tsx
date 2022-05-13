import { unwrapResult } from '@reduxjs/toolkit';
import { Formik } from 'formik';
import { t } from 'i18next';
import Link from 'next/link';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import Input from '../../components/elements/Input';
import { Routers } from '../../configs/navigator';
import { loginLocal } from '../../redux/auth';
// import ReCAPTCHA from 'react-google-recaptcha';

const Schema = Yup.object().shape({
  email: Yup.string().required('yup.empty'),
  password: Yup.string()
    .required('yup.empty')
    .min(6, 'yup.password.not.length'),
});
const initialValues = { email: '', password: '' };

const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  // const recaptchaRef = React.createRef();
  const [errorMessage, setErrorMessage] = useState({
    email: '',
    password: '',
  });
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
    <div className="col-lg-6 col-12">
      <div className="my__account__wrapper">
        <h3 className="account__title">{t('login.login')}</h3>
        <Formik
          onSubmit={handleFormSubmit}
          validationSchema={Schema}
          validateOnChange={false}
          initialValues={initialValues}
        >
          {({ handleSubmit, errors, values, handleChange }) => {
            return (
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
                          : null || t(errorMessage.email) || ''
                      }
                    />
                  </div>
                  <div className="input__box">
                    <label>
                      {t('login.password')}
                      <span>*</span>
                    </label>
                    <Input
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      error={
                        errors.password
                          ? t(errors.password, { field: t('password') })
                          : null || t(errorMessage.password) || ''
                      }
                    />
                  </div>
                  {/* <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey="6LcFezIfAAAAAJJTC2r1xmMYlAdam1BcqCMdxJo7"
                    onChange={onChange}
                  /> */}
                  <div className="form__btn">
                    <button type="submit">{t('login.login')}</button>
                    <label className="label-for-checkbox">
                      <Input
                        id="rememberme"
                        className="input-checkbox"
                        name="rememberme"
                        defaultValue="forever"
                        type="checkbox"
                      />
                      <span>{t('login.remember')}</span>
                    </label>
                  </div>
                  <a className="forget_pass" href="#">
                    {t('login.lost-password')}
                  </a>
                  <Link href={Routers.register.path}>
                    <a className="forget_pass">{t('login.sign-in')}</a>
                  </Link>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
