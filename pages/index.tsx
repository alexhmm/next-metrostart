import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Box, CircularProgress, Typography } from '@mui/material';

// Stores
import useCollectionStore from '@/src/modules/collection/collection.store';

// Styles
import styles from './Home.module.scss';

// Types
import { Collection } from '@/src/modules/collection/collection.types';

// Components
import CollectionCreateEdit from '@/src/modules/collection/components/CollectionCreateEdit/CollectionCreateEdit';

// UI
import Dialog from '@/src/ui/Dialog/Dialog';
import TextButtonOutlined from '@/src/ui/TextButtonOutlined/TextButtonOutlined';

// Utils
import { getCollections } from '@/src/modules/collection/collection.utils';

export default function Home(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const router = useRouter();
  const { t } = useTranslation();

  // Collection store state
  const [collectionCreate, setCollectionCreate] = useCollectionStore(
    (state) => [state.collectionCreate, state.setCollectionCreate]
  );

  // Page state
  const [collectionsStorage, setCollectionsStorage] = useState<Collection[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // ####### //
  // EFFECTS //
  // ####### //

  // Get collections from LocalStorage on mount
  useEffect(() => {
    setCollectionsStorage(getCollections());
  }, []);

  // Redirect to active colltion
  useEffect(() => {
    if (collectionsStorage && collectionsStorage.length > 0) {
      const activeCollectionId: string | undefined =
        localStorage.getItem('activeCollection') ?? undefined;
      const activeCollection = collectionsStorage.find(
        (collection) => collection.id === activeCollectionId
      );

      // Navigate to active collection
      if (activeCollection) {
        router.replace(`/collections/${activeCollectionId}`);
      } else {
        router.replace(`/collections/${collectionsStorage[0].id}`);
      }
    }
    setIsLoading(false);
  }, [collectionsStorage]);

  return (
    <>
      <Head>
        <title>Metrostart</title>
      </Head>
      {isLoading && (
        <div className={styles['home']}>
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
        </div>
      )}
      {!isLoading && collectionsStorage.length < 1 && (
        <Box
          className={styles['home']}
          sx={{ backgroundColor: 'background.paper' }}
        >
          <Typography className={styles['home-title']} variant="h5">
            {t('home:title')}
          </Typography>
          <p>
            {t('home:what.content1')} {t('home:what.content2')}{' '}
          </p>
          <p>{t('home:what.content3')}</p>
          <TextButtonOutlined
            className={styles['home-start-button']}
            onClick={() => setCollectionCreate(true)}
          >
            {t('home:what.button')}
          </TextButtonOutlined>
          <Dialog
            open={collectionCreate}
            title={t(
              collectionCreate
                ? 'collection:create_edit.title_create'
                : 'collection:create_edit.title_edit'
            ).toString()}
            onClose={() => {
              setCollectionCreate(false);
            }}
          >
            <CollectionCreateEdit
              onClose={() => {
                setCollectionCreate(false);
              }}
            />
          </Dialog>
        </Box>
      )}
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', [
      'common',
      'collection',
      'home',
    ])),
  },
});
