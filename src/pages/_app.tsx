import type { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '../libs/theme';
import { useDispatch, useSelector } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import i18n from '../languages/i18n';
import { getItemStorage } from '../libs/utils/localStorage';
import { notificationSelector } from '../redux/app/selectors';
import { clearMessage } from '../redux/app';
import { wrapper } from '../redux';
import Snackbar from '../components/elements/Snackbar';
import { AuthContainer } from '../containers/AuthContainer';
import { GlobalEvent } from '../containers/GlobalEvent';

function BookStoreApplication({ Component, pageProps }: AppProps) {
  const dispatch = useDispatch();
  const notification = useSelector(notificationSelector);

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);
  // const store = createStore(rootReducer, applyMiddleware(thunk));
  useEffect(() => {
    const lang = getItemStorage('language');
    if (lang) i18n.changeLanguage(lang);
    // if (lang) i18n.changeLanguage('vi');
  }, []);

  return (
    <React.Fragment>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* <Provider store={store}> */}

          <AuthContainer>
            <GlobalEvent>
              <Component {...pageProps} />
              <Snackbar
                open={notification.open}
                message={notification.message}
                onClose={() => dispatch(clearMessage())}
                type={notification.type}
              />
            </GlobalEvent>
          </AuthContainer>
          {/* </Provider> */}
        </ThemeProvider>
      </I18nextProvider>
    </React.Fragment>
  );
}

export default wrapper.withRedux(BookStoreApplication);
