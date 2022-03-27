import type { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '../libs/theme';
import { applyMiddleware, createStore } from '@reduxjs/toolkit';
import rootReducer from '../redux/rootReducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { I18nextProvider } from 'react-i18next';
import i18n from '../languages/i18n';
import { getItemStorage } from '../libs/utils/localStorage';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);
  const store = createStore(rootReducer, applyMiddleware(thunk));

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
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </ThemeProvider>
      </I18nextProvider>
    </React.Fragment>
  );
}

export default MyApp;
