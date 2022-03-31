import React from 'react';

const RegisterForm: React.FC = () => {
  return (
    <div className="col-lg-6 col-12">
      <div className="my__account__wrapper">
        <h3 className="account__title">Login</h3>
        <form action="#">
          <div className="account__form">
            <div className="input__box">
              <label>
                Username or email address <span>*</span>
              </label>
              <input type="text" />
            </div>
            <div className="input__box">
              <label>
                Password<span>*</span>
              </label>
              <input type="text" />
            </div>
            <div className="form__btn">
              <button>Login</button>
              <label className="label-for-checkbox">
                <input
                  id="rememberme"
                  className="input-checkbox"
                  name="rememberme"
                  defaultValue="forever"
                  type="checkbox"
                />
                <span>Remember me</span>
              </label>
            </div>
            <a className="forget_pass" href="#">
              Lost your password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
