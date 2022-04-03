import React, { memo } from 'react';
import { useSelector } from 'react-redux';

import { authSelector } from '../../redux/auth/selectors';

const Authenticated: React.FC = ({ children }) => {
  const isAuthenticated = useSelector(authSelector);

  if (!isAuthenticated) return null;

  return <>{children}</>;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export default memo<React.PropsWithChildren<{}>>(Authenticated);
