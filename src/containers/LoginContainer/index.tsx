import { Box } from '@mui/material';
import React from 'react';
import LoginForm from './loginForm';

// export const

const RegisterContainer: React.FC = () => {
  //   const [];
  return (
    <>
      {/* Start Bradcaump area */}
      <div className="ht__bradcaump__area bg-image--6">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="bradcaump__inner text-center">
                <h2 className="bradcaump-title">My Account</h2>
                <nav className="bradcaump-content">
                  <a className="breadcrumb_item" href="index.html">
                    Home
                  </a>
                  <span className="brd-separetor">/</span>
                  <span className="breadcrumb_item active">My Account</span>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Bradcaump area */}
      <section className="my_account_area pt--80 pb--55 bg--white">
        <div className="container">
          {/* <div className="row"> */}
          <Box display="flex" justifyContent="center">
            <LoginForm />
          </Box>
          {/* </div> */}
        </div>
      </section>
    </>
  );
};

export default RegisterContainer;
