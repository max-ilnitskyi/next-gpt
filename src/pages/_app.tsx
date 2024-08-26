import React from 'react';
import { AppProps } from 'next/app';
import { ErrorProps } from 'next/error';

import '@/styles/globals.scss';

function MyApp({ Component, pageProps, err }: AppProps & { err: ErrorProps }) {
  return <Component {...pageProps} err={err} />;
}

export default MyApp;
