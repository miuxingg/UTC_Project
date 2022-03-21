/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable require-jsdoc */
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '../libs/theme';
import { applyMiddleware, createStore } from '@reduxjs/toolkit';
import rootReducer from '../redux/rootReducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);
  const store = createStore(rootReducer, applyMiddleware(thunk));
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default MyApp;
