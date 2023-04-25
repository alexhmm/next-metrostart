import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { EmotionCache } from '@emotion/react';

// Components
import Header from '@/shared/components/Header/Header';

// Styles
import '@/shared/styles/globals.scss';

// Utils
import createEmotionCache from '@/shared/utils/create-emotion-cache';
import PageProvider from '@/shared/providers/PageProvider';

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
