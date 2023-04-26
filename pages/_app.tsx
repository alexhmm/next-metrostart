import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { EmotionCache } from '@emotion/react';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

// Components
import Header from '@/src/components/Header/Header';

// Styles
import '@/src/styles/globals.scss';

// Utils
import createEmotionCache from '@/src/utils/create-emotion-cache';
import PageProvider from '@/src/providers/PageProvider';
import '@/src/utils/fa';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  // Remove the server-side injected CSS.
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <PageProvider emotionCache={emotionCache}>
      <Header />
      <Component {...pageProps} />
    </PageProvider>
  );
}
