import { useEffect } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// Component
import CollectionContent from '@/src/modules/collection/components/CollectionContent/CollectionContent';

// Stores
import useCollectionStore from '@/src/modules/collection/collection.store';

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
  }, [props.id]);

  return (
    <>
      <Head>
        <title>Metrostart • {collection?.name}</title>
      </Head>
      <div>{collection && <CollectionContent collection={collection} />}</div>
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
