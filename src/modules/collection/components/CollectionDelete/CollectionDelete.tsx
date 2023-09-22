import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { Typography } from '@mui/material';

// Stores
import useCollectionStore from '../../collection.store';

// Styles
import styles from './CollectionDelete.module.scss';

// UI
import TextButtonOutlined from '@/src/ui/TextButtonOutlined/TextButtonOutlined';

// Utils
import { getCollections, updateCollections } from '../../collection.utils';

type CollectionDeleteProps = {
  id: string;
  name: string;
  onClose: () => void;
};

const CollectionDelete: FC<CollectionDeleteProps> = (props) => {
  const router = useRouter();
  const { t } = useTranslation();

  // Collection store state
  const [setCollections] = useCollectionStore((state) => [
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
      const indexToDelete = collectionsStorage.findIndex(
        (collection) => collection.id === props.id
      );
      if (indexToDelete > -1) {
        collectionsStorage.splice(indexToDelete, 1);

        // Redirect to first collection or to home page
        if (collectionsStorage.length > 0) {
          router.replace(`/collections/${collectionsStorage[0].id}`);
        } else {
          router.replace('/');
        }

        // Update LocalStorage and store
        updateCollections(collectionsStorage);
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
        {t('collection:delete.text', { name: props.name })}
      </Typography>
      <div className={styles['collection-delete-actions']}>
        <TextButtonOutlined onClick={props.onClose}>
          {t('common:cancel')}
        </TextButtonOutlined>
        <TextButtonOutlined onClick={onDelete}>
          {t('collection:delete.title')}
        </TextButtonOutlined>
      </div>
    </div>
  );
};

export default memo(CollectionDelete);
