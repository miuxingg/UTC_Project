import React, { useState } from 'react';
import ChangePassword from './ChangePassword';
import Profile from './Profile';
// import Profile from './Profile';

const ProfileContainer: React.FC = () => {
  const [isChangePassword, setIsChangePassword] = useState<boolean>(false);
  return (
    <>
      {isChangePassword ? (
        <ChangePassword onProfileLinkClick={() => setIsChangePassword(false)} />
      ) : (
        <Profile onChangePasswordLinkClick={() => setIsChangePassword(true)} />
      )}
    </>
  );
};

export default ProfileContainer;
