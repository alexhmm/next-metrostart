import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { Typography } from '@mui/material';

// Hooks
import useCollection from '../../use-collection.hook';

// Stores
import useCollectionStore from '../../collection.store';

// Styles
import styles from './CollectionDelete.module.scss';

// Types
import { ResultState } from '@/src/types/shared.types';

// UI
import Input from '@/src/ui/Input/Input';
import TextButtonOutlined from '@/src/ui/TextButtonOutlined/TextButtonOutlined';

// Utils
import { getCollections, updateCollections } from '../../collection.utils';

type CollectionDeleteProps = {
  id: string;
  onClose: () => void;
};

const CollectionDelete: FC<CollectionDeleteProps> = (props) => {
  const { createCollection } = useCollection();
  const router = useRouter();
  const { t } = useTranslation();

  // Collection store state
  const [setCollection, setCollections] = useCollectionStore((state) => [
    state.setCollection,
    state.setCollections,
  ]);

  // ######### //
  // CALLBACKS //
  // ######### //

  /**
   * Handler to delete collection by id.
   */
  const onDelete = useCallback(() => {
    if (typeof window !== 'undefined') {
      let collectionsStorage = getCollections();
      // collections.filter((collection) => collection.id !== props.id);
      const indexToDelete = collectionsStorage.findIndex(
        (collection) => collection.id === props.id
      );
      if (indexToDelete > -1) {
        collectionsStorage.splice(indexToDelete, 1);

        // Set first collection for view or create new one if none exists
        if (collectionsStorage.length > 0) {
          setCollection(collectionsStorage[0]);
        } else {
          const newCollection = createCollection();
          setCollection(newCollection);
          collectionsStorage.push(newCollection);
          router.replace(`/collections/${newCollection.id}`);
        }

        // Update LocalStorage
        updateCollections(collectionsStorage);

        // Update store
        setCollections(collectionsStorage);

        props.onClose();
      }
    }
    // eslint-disable-next-line
  }, [props]);

  return (
    <div className={styles['collection-delete']}>
      <Typography
        className={styles['collection-delete-text']}
        color="text.secondary"
      >
        {t('collection:delete.text')}
      </Typography>
      <div className={styles['collection-delete-actions']}>
        <TextButtonOutlined onClick={props.onClose}>
          {t('collection:delete.cancel')}
        </TextButtonOutlined>
        <TextButtonOutlined onClick={onDelete}>
          {t('collection:delete.title')}
        </TextButtonOutlined>
      </div>
    </div>
  );
};

export default memo(CollectionDelete);
