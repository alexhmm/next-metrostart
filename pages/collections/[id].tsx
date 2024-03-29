import { useEffect } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// Component
import CollectionContent from '@/src/modules/collection/components/CollectionContent/CollectionContent';
import CollectionNav from '@/src/modules/collection/components/CollectionNav/CollectionNav';

// Stores
import useCollectionStore from '@/src/modules/collection/collection.store';

// Styles
import styles from './Collection.module.scss';

// Types
import { Collection } from '@/src/modules/collection/collection.types';

export default function Collection(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const router = useRouter();

  // Collection store staate
  const [collection, setCollection] = useCollectionStore((state) => [
    state.collection,
    state.setCollection,
  ]);

  // ####### //
  // EFFECTS //
  // ####### //

  // Set collection by id on mount
  useEffect(() => {
    if (props.id) {
      const collections: Collection[] = JSON.parse(
        localStorage.getItem('collections') ?? '[]'
      );

      const matchedCollection = collections.find(
        (collection) => collection.id === props.id
      );

      // Set active collection id on match
      if (matchedCollection) {
        localStorage.setItem('activeCollection', matchedCollection.id);
      } else {
        localStorage.removeItem('activeCollection');
        router.replace('/');
      }

      setCollection(matchedCollection);
    }

    return () => {
      setCollection(undefined);
    };
    // eslint-disable-next-line
  }, [props.id]);

  return (
    <>
      <Head>
        <title>Metrostart • {collection?.name}</title>
      </Head>
      <div className={styles['collection']}>
        <CollectionNav />
        {collection && <CollectionContent collection={collection} />}
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  query,
}) => {
  // #TODO: Get collection by server
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'common',
        'collection',
        'header',
      ])),
      id: query.id,
    },
  };
};
