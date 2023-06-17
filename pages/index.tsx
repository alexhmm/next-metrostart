import { useEffect } from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// Components
import CollectionContent from '@/src/modules/collection/components/CollectionContent/CollectionContent';

// Stores
import useCollectionStore from '@/src/modules/collection/collection.store';

// Styles
import styles from './Home.module.scss';

// Types
import { Collection } from '@/src/modules/collection/collection.types';

// UI
import TextButtonOutlined from '@/src/ui/TextButtonOutlined/TextButtonOutlined';

export default function Home(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const router = useRouter();
  const { t } = useTranslation();

  // Change language
  const changeTo = router.locale === 'en' ? 'de' : 'en';

  // Collection store state
  const [collection, setCollection] = useCollectionStore((state) => [
    state.collection,
    state.setCollection,
  ]);

  // ####### //
  // EFFECTS //
  // ####### //

  // Set collection on mount
  useEffect(() => {
    const collections: Collection[] = JSON.parse(
      localStorage.getItem('collections') ?? '[]'
    );
    collections && collections.length > 0 && setCollection(collections[0]);

    return () => {
      setCollection(undefined);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Head>
        <title>Metrostart • Home</title>
      </Head>
      <div className={styles['home']}>
        {collection && <CollectionContent collection={collection} />}
        <Link href="/" locale={changeTo}>
          <TextButtonOutlined className="mt-4">
            {t<any>('common:settings.language.title', { changeTo })}
          </TextButtonOutlined>
        </Link>
        {collection && (
          <Link href={`/collections/${collection.id}`}>{collection.name}</Link>
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
