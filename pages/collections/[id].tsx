import { useEffect } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// Component
import CollectionContent from '@/src/modules/collection/components/CollectionContent/CollectionContent';
import CollectionList from '@/src/modules/collection/components/CollectionList/CollectionList';

// Stores
import useCollectionStore from '@/src/modules/collection/collection.store';

// Styles
import styles from './Collection.module.scss';

// Types
import { Collection } from '@/src/modules/collection/collection.types';

export default function Collection(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
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
      setCollection(
        collections.find((collection) => collection.id === props.id)
      );
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
        <CollectionList />
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
      ])),
      id: query.id,
    },
  };
};
