import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { v4 as uuidv4 } from 'uuid';

// Stores
import useCollectionStore from '../../collection.store';

// Styles
import styles from './LinkItemCreateEdit.module.scss';

// Types
import {
  Collection,
  LinkItem,
  LinkItemPostPatchRequest,
} from '../../collection.types';
import { ResultState } from '@/src/types/shared.types';

// UI
import Input from '@/src/ui/Input/Input';
import TextButtonOutlined from '@/src/ui/TextButtonOutlined/TextButtonOutlined';

type LinkItemCreateEditProps = {
  item?: LinkItem;
  onClose: () => void;
};

const LinkItemCreateEdit: FC<LinkItemCreateEditProps> = (props) => {
  const { t } = useTranslation();

  // Collection store state
  const [collection, setCollection] = useCollectionStore((state) => [
    state.collection,
    state.setCollection,
  ]);

  // React hook form validation schema
  const linkItemCreateEditSchema = z.object({
    name: z.string().min(1, {
      message: t<any>('collection:link.create_edit.name.error'),
    }),
    url: z.string().min(1, {
      message: t<any>('collection:link.create_edit.url.error'),
    }),
  });

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<LinkItemPostPatchRequest>({
    resolver: zodResolver(linkItemCreateEditSchema),
  });

  // ######### //
  // CALLBACKS //
  // ######### //

  /**
   * Handler to create or edit a link item.
   * @param body LinkItemPostPatchRequest
   */
  const onCreateEditLinkItem = useCallback(
    (body: LinkItemPostPatchRequest) => {
      if (!props.item) {
        // Create link item
        const link: LinkItem = {
          id: uuidv4(),
          icon: `https://www.google.com/s2/favicons?domain=${body.url}&sz=96`,
          name: body.name,
          url: body.url,
        };

        const id = uuidv4();

        // Set collection object
        const updatedCollection: Collection = collection
          ? { ...collection, links: [...collection.links, link] }
          : {
              id,
              links: [link],
              name: `${t<any>('collection:title')} ${id}`,
            };
        setCollection(updatedCollection);

        // Update LocalStorage
        if (typeof window !== 'undefined') {
          let collections = JSON.parse(
            localStorage.getItem('collections') ?? '[]'
          ) as Collection[];
          if (collections && collections.length > 0) {
            collections[0].links.push(link);
          } else {
            collections = [updatedCollection];
          }
          localStorage.setItem('collections', JSON.stringify(collections));
        }
        props.onClose();
      }
    },
    [props]
  );

  return (
    <form
      className={styles['link-item-create-edit']}
      onSubmit={handleSubmit(onCreateEditLinkItem)}
    >
      <Input
        autoFocus
        classes={styles['link-item-create-edit-item']}
        label={t<any>('collection:link.create_edit.name.label')}
        message={errors?.name && errors.name.message?.toString()}
        placeholder={t<any>('collection:link.create_edit.name.placeholder')}
        register={register('name')}
        state={errors?.name && ResultState.Error}
      />
      <Input
        classes={styles['link-item-create-edit-item']}
        label={t<any>('collection:link.create_edit.url.label')}
        message={errors?.url && errors.url.message?.toString()}
        placeholder={t<any>('collection:link.create_edit.url.placeholder')}
        register={register('url')}
        state={errors?.url && ResultState.Error}
      />
      <div className={styles['link-item-create-edit-actions']}>
        <TextButtonOutlined type="submit">
          {t<any>('common:submit')}
        </TextButtonOutlined>
      </div>
    </form>
  );
};

export default memo(LinkItemCreateEdit);
