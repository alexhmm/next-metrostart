import { useEffect, useState } from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Box, CircularProgress } from '@mui/material';

// Hooks
import useCollection from '@/src/modules/collection/use-collection.hook';

// Stores
import useCollectionStore from '@/src/modules/collection/collection.store';

// Styles
import styles from './Home.module.scss';

// Types
import { Collection } from '@/src/modules/collection/collection.types';

// Utils
import {
  getCollections,
  updateCollections,
} from '@/src/modules/collection/collection.utils';

export default function Home(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { createCollection } = useCollection();
  const router = useRouter();

  // Collection store state
  const [setCollections] = useCollectionStore((state) => [
    state.setCollections,
  ]);

  // Page state
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // ####### //
  // EFFECTS //
  // ####### //

  // Set collection on mount
  useEffect(() => {
    const collectionsStorage: Collection[] = getCollections();
    if (collectionsStorage && collectionsStorage.length > 0) {
      const activeCollection: string | undefined =
        localStorage.getItem('activeCollection') ?? undefined;

      // Navigate to active collection
      if (activeCollection) {
        router.replace(`/collections/${activeCollection}`);
      } else {
        router.replace(`/collections/${collectionsStorage[0].id}`);
      }
    } else {
      // Set first collection for view or create new one if none exists
      const newCollection = createCollection();
      collectionsStorage.push(newCollection);

      // Update LocalStorage
      updateCollections(collectionsStorage);

      // Update store
      setCollections(collectionsStorage);

      router.replace(`/collections/${newCollection.id}`);
    }
    setIsLoading(false);
  }, []);

  return (
    <>
      <Head>
        <title>Metrostart • Home</title>
      </Head>
      <div className={styles['home']}>
        {isLoading && (
          <Box
            className={styles['home-progress']}
            sx={{ backgroundColor: 'text.primary' }}
          >
            <CircularProgress
              className={styles['home-progress-circular']}
              color="primary"
              size="1.5rem"
            />
          </Box>
        )}
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common', 'collection'])),
  },
});
