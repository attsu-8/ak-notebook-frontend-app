import { Provider as ReduxProvider } from 'react-redux';
import store from '../store/store';
import type { VFC, ReactNode } from 'react';
import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import Router from 'next/router';
import nProgress from 'nprogress';
import Head from 'next/head';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import ja from 'date-fns/locale/ja';
import { ThemeProvider } from '../components/themeProvider';
import { Splash } from '../components/splash';

type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type EnhancedAppProps = AppProps & {
  Component: Page;
};

Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeError', nProgress.done);
Router.events.on('routeChangeComplete', nProgress.done);

const App: VFC<EnhancedAppProps> = (props) => {
  const { Component, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <title>ak-notebook</title>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <ReduxProvider store={store}>
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ja}>
          <ThemeProvider>
            <CssBaseline />
            <Splash>{getLayout(<Component {...pageProps} />)}</Splash>
          </ThemeProvider>
        </LocalizationProvider>
      </ReduxProvider>
    </>
  );
};

export default App;
