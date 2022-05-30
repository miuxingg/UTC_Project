import React from 'react';
import GoogleLogin from 'react-google-login';

interface IGoogleLoginForm {
  clientId: string;
}
const GoogleLoginForm: React.FC<IGoogleLoginForm> = ({ clientId }) => {
  const responseGoogle = (response: any) => {
    console.log('response, ', response);
  };
  const rejectGoogle = (rejectGoogle: any) => {
    console.log('Reject: ', rejectGoogle);
  };
  console.log(clientId);

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={rejectGoogle}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleLoginForm;
