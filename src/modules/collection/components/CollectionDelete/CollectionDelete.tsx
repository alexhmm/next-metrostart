import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Typography } from '@mui/material';

// Hooks
import useCollection from '../../use-collection.hook';

// Stores
import useCollectionStore from '../../collection.store';

// Styles
import styles from './CollectionDelete.module.scss';

// Types
import { CollectionPostPatchRequest } from '../../collection.types';
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
  const { t } = useTranslation();

  // Collection store state
  const [setCollection, setCollections] = useCollectionStore((state) => [
    state.setCollection,
    state.setCollections,
  ]);

  // React hook form validation schema
  // #todo: Name validation
  const collectionDeleteSchema = z.object({
    name: z.string().min(1, {
      message: t<any>('collection:name.error'),
    }),
  });

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<CollectionPostPatchRequest>({
    resolver: zodResolver(collectionDeleteSchema),
  });

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
        }

        // Update LocalStorage
        updateCollections(collectionsStorage);

        // Update store
        setCollections(collectionsStorage);

        props.onClose();
      }
    }
  }, [props]);

  return (
    <form
      className={styles['collection-delete']}
      onSubmit={handleSubmit(onDelete)}
    >
      <Typography
        className={styles['collection-delete-text']}
        color="text.secondary"
      >
        {t<any>('collection:delete.text')}
      </Typography>
      <Input
        autoFocus
        classes={styles['collection-delete-name']}
        label={t<any>('collection:name.label')}
        message={errors?.name && errors.name.message?.toString()}
        placeholder={t<any>('collection:name.placeholder')}
        register={register('name')}
        state={errors?.name && ResultState.Error}
      />
      <div className={styles['collection-delete-submit']}>
        <TextButtonOutlined type="submit">
          {t<any>('collection:delete.title')}
        </TextButtonOutlined>
      </div>
    </form>
  );
};

export default memo(CollectionDelete);
