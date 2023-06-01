import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { EmotionCache } from '@emotion/react';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

// Components
import Layout from '@/src/components/Layout/Layout';

// Styles
import '@/src/styles/globals.scss';

// Stores
import useCollectionStore from '@/src/modules/collection/collection.store';

// Types
import { Collection } from '@/src/modules/collection/collection.types';

// Utils
import { mapCollectionsWithoutLinks } from '@/src/modules/collection/collection.utils';
import createEmotionCache from '@/src/utils/create-emotion-cache';
import PageProvider from '@/src/providers/PageProvider';
import '@/src/utils/fa';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function App(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  // Collection store state
  const [setCollections] = useCollectionStore((state) => [
    state.setCollections,
  ]);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }

    // Doing this in zustand store directly:
    // Unhandled Runtime Error
    // Error: Hydration failed because the initial UI does not match what was rendered on the server.
    if (typeof window !== 'undefined') {
      const initialCollections: Collection[] = JSON.parse(
        localStorage.getItem('collections') ?? '[]'
      );
      if (initialCollections && initialCollections[0]) {
        setCollections(mapCollectionsWithoutLinks(initialCollections));
      }
    }
  }, []);

  // Set collection data on mount
  useEffect(() => {}, []);

  return (
    <PageProvider emotionCache={emotionCache}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </PageProvider>
  );
}

export default appWithTranslation(App);
