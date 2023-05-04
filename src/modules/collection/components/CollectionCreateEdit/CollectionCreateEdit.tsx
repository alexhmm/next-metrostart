import { FC, memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { v4 as uuidv4 } from 'uuid';

// Stores
import useCollectionStore from '../../collection.store';

// Styles
import styles from './CollectionCreateEdit.module.scss';

// Types
import { Collection, CollectionPostPatchRequest } from '../../collection.types';
import { ResultState } from '@/src/types/shared.types';

// UI
import Input from '@/src/ui/Input/Input';
import TextButtonOutlined from '@/src/ui/TextButtonOutlined/TextButtonOutlined';

// Utils
import { getCollectionById } from '../../collection.utils';

type CollectionCreateEditProps = {
  id?: string;
  onClose: () => void;
};

const LinkItemCreateEdit: FC<CollectionCreateEditProps> = (props) => {
  const { t } = useTranslation();

  // Collection store state
  const [setCollection] = useCollectionStore((state) => [state.setCollection]);

  // Component state
  const [collection] = useState<Collection | undefined>(
    getCollectionById(props && props.id)
  );

  // React hook form validation schema
  const linkItemCreateEditSchema = z.object({
    description: z.string(),
    name: z.string().min(1, {
      message: t<any>('collection:create_edit.name.error'),
    }),
  });

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<CollectionPostPatchRequest>({
    resolver: zodResolver(linkItemCreateEditSchema),
  });

  // ######### //
  // CALLBACKS //
  // ######### //

  /**
   * Handler to create or edit a collection.
   * @param body CollectionPostPatchRequest
   */
  const onCreateEdit = useCallback(
    (body: CollectionPostPatchRequest) => {
      if (typeof window !== 'undefined') {
        let collections = JSON.parse(
          localStorage.getItem('collections') ?? '[]'
        ) as Collection[];
        if (!props.id) {
          const id = uuidv4();

          // Create collection
          const collectionNew: Collection = {
            id,
            description: body.description,
            links: [],
            name: body.name,
          };

          // Update LocalStorage
          collections.push(collectionNew);
          setCollection(collectionNew);
        } else {
          const updatedCollection = collections.find(
            (collection) => collection.id === props.id
          );
          if (updatedCollection) {
            updatedCollection.description = body.description;
            updatedCollection.name = body.name;
            setCollection(updatedCollection);
          }
        }
        localStorage.setItem('collections', JSON.stringify(collections));
        props.onClose();
      }
    },
    [props]
  );

  return (
    <form
      className={styles['collection-create-edit']}
      onSubmit={handleSubmit(onCreateEdit)}
    >
      <Input
        autoFocus
        classes={styles['collection-create-edit-item']}
        defaultValue={collection?.name}
        label={t<any>('collection:create_edit.name.label')}
        message={errors?.name && errors.name.message?.toString()}
        placeholder={t<any>('collection:link.create_edit.name.placeholder')}
        register={register('name')}
        state={errors?.name && ResultState.Error}
      />
      <Input
        classes={styles['collection-create-edit-item']}
        defaultValue={collection?.description}
        label={t<any>('collection:create_edit.description.label')}
        message={errors?.name && errors.name.message?.toString()}
        placeholder={t<any>('collection:create_edit.description.placeholder')}
        register={register('description')}
      />
      <div className={styles['collection-create-edit-actions']}>
        <TextButtonOutlined type="submit">
          {t<any>('common:submit')}
        </TextButtonOutlined>
      </div>
    </form>
  );
};

export default memo(LinkItemCreateEdit);
