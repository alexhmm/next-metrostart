import { FC, memo, useCallback, useState } from 'react';
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
import { Collection, CollectionPostPatchRequest } from '../../collection.types';
import { ResultState } from '@/src/types/shared.types';

// UI
import Input from '@/src/ui/Input/Input';
import TextButtonOutlined from '@/src/ui/TextButtonOutlined/TextButtonOutlined';

type CollectionDeleteProps = {
  id: string;
  onClose: () => void;
};

const LinkItemCreateEdit: FC<CollectionDeleteProps> = (props) => {
  const { createCollection } = useCollection();
  const { t } = useTranslation();

  // Collection store state
  const [setCollection] = useCollectionStore((state) => [state.setCollection]);

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
      let collections = JSON.parse(
        localStorage.getItem('collections') ?? '[]'
      ) as Collection[];
      // collections.filter((collection) => collection.id !== props.id);
      const indexToDelete = collections.findIndex(
        (collection) => collection.id === props.id
      );
      if (indexToDelete > -1) {
        collections.splice(indexToDelete, 1);

        // Set first collection for view or create new one if none exists
        if (collections.length > 0) {
          setCollection(collections[0]);
        } else {
          const newCollection = createCollection();
          setCollection(newCollection);
          collections.push(newCollection);
        }

        localStorage.setItem('collections', JSON.stringify(collections));
        setCollection(collections.length > 0 ? collections[0] : undefined);
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

export default memo(LinkItemCreateEdit);
