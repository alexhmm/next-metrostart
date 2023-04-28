import { useEffect, useState } from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Typography } from '@mui/material';

// Components
import LinkItem from '@/src/modules/collection/components/LinkItem/LinkItem';
import LinkItemCreateEdit from '@/src/modules/collection/components/LinkItemCreateEdit/LinkItemCreateEdit';

// Stores
import useCollectionStore from '@/src/modules/collection/collection.store';

// Styles
import styles from './Home.module.scss';

// Types
import { Collection } from '@/src/modules/collection/collection.types';

// UI
import Dialog from '@/src/ui/Dialog/Dialog';
import IconButton from '@/src/ui/IconButton/IconButton';

export default function Home(
  _props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const router = useRouter();
  const { t } = useTranslation();

  // Change language
  const changeTo = router.locale === 'en' ? 'de' : 'en';

  // Component state
  const [linkAddEdit, setLinkCreateEdit] = useState<boolean>(false);

  // Collection store state
  const [collection, setCollection] = useCollectionStore((state) => [
    state.collection,
    state.setCollection,
  ]);

  // Set collection data on mount
  useEffect(() => {
    // Doing this in zustand store directly:
    // Unhandled Runtime Error
    // Error: Hydration failed because the initial UI does not match what was rendered on the server.
    if (typeof window !== 'undefined') {
      const initialCollections: Collection[] = JSON.parse(
        localStorage.getItem('collections') ?? '[]'
      );
      if (initialCollections && initialCollections[0])
        setCollection(initialCollections[0]);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Metrostart</title>
      </Head>
      <main className={styles['home']}>
        <div className={styles['home-collection-header']}>
          <Typography
            className={styles['home-collection-header-title']}
            variant="h5"
          >
            {collection?.name ?? ''}
          </Typography>
          <IconButton
            icon={['fas', 'plus']}
            onClick={() => setLinkCreateEdit(true)}
          />
        </div>
        <div className={styles['home-collection-content']}>
          {collection?.links?.map((link) => (
            <LinkItem key={link.id} item={link} />
          ))}
        </div>
        <Link href="/" locale={changeTo}>
          {/* #TODO: Type 'TFunctionDetailedResult<never>' is not assignable to type 'ReactI18NextChildren'. */}
          <button>
            {t<any>('common:settings.language.title', { changeTo })}
          </button>
        </Link>
        <Dialog
          open={linkAddEdit}
          title="Link hinzufügen"
          onClose={() => setLinkCreateEdit(false)}
        >
          <LinkItemCreateEdit onClose={() => setLinkCreateEdit(false)} />
        </Dialog>

        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common', 'collection'])),
  },
});
