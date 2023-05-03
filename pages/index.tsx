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

// Hooks
import useCollection from '@/src/modules/collection/use-collection.hook';

// Stores
import useCollectionStore from '@/src/modules/collection/collection.store';

// Styles
import styles from './Home.module.scss';

// Types
import { Collection } from '@/src/modules/collection/collection.types';

// UI
import Dialog from '@/src/ui/Dialog/Dialog';
import IconButton from '@/src/ui/IconButton/IconButton';
import Menu from '@/src/ui/Menu/Menu';
import TextButtonOutlined from '@/src/ui/TextButtonOutlined/TextButtonOutlined';

export default function Home(
  _props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const router = useRouter();
  const { getMenuActions } = useCollection();
  const { t } = useTranslation();

  // Change language
  const changeTo = router.locale === 'en' ? 'de' : 'en';

  // Component state
  const [linkCreateEdit, setLinkCreateEdit] = useState<boolean>(false);

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
            {/* #TODO: Type 'TFunctionDetailedResult<never>' is not assignable to type 'ReactI18NextChildren'. */}
            {collection?.name ?? t<any>('collection:title')}
          </Typography>
          <div className={styles['home-collection-header-actions']}>
            <Menu
              icon={['fas', 'ellipsis-v']}
              items={getMenuActions()}
              onAction={(action) => console.log('MenuAction', action)}
            />
            <IconButton
              classes={styles['home-collection-header-actions-create-item']}
              icon={['fas', 'plus']}
              onClick={() => setLinkCreateEdit(true)}
            />
          </div>
        </div>
        {(!collection ||
          (collection?.links && collection?.links.length < 1)) && (
          <TextButtonOutlined
            classes="w-fit"
            onClick={() => setLinkCreateEdit(true)}
          >
            {t<any>('collection:link.create_edit.title_create')}
          </TextButtonOutlined>
        )}
        <div className={styles['home-collection-content']}>
          {collection?.links?.map((link) => (
            <LinkItem key={link.id} item={link} />
          ))}
        </div>
        <Dialog
          open={linkCreateEdit}
          title={t<any>('collection:link.create_edit.title_create').toString()}
          onClose={() => setLinkCreateEdit(false)}
        >
          <LinkItemCreateEdit onClose={() => setLinkCreateEdit(false)} />
        </Dialog>
        <Link href="/" locale={changeTo}>
          <TextButtonOutlined classes="mt-4">
            {t<any>('common:settings.language.title', { changeTo })}
          </TextButtonOutlined>
        </Link>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common', 'collection'])),
  },
});
