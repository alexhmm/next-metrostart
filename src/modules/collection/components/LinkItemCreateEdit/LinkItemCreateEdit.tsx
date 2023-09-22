import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { v4 as uuidv4 } from 'uuid';

// Stores
import useCollectionStore from '@/src/modules/collection/collection.store';

// Styles
import styles from './LinkItemCreateEdit.module.scss';

// Types
import {
  Collection,
  Link,
  LinkItemPostPatchRequest,
} from '@/src/modules/collection/collection.types';
import { ResultState } from '@/src/types/shared.types';

// UI
import Input from '@/src/ui/Input/Input';
import TextButtonOutlined from '@/src/ui/TextButtonOutlined/TextButtonOutlined';

// Utils
import {
  getCollections,
  updateCollections,
} from '@/src/modules/collection/collection.utils';

type LinkItemCreateEditProps = {
  link?: Link;
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
      message: t('collection:link.create_edit.name.error').toString(),
    }),
    url: z
      .string()
      .refine(
        (value) =>
          /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(
            value
          ),
        t('collection:link.create_edit.url.error').toString()
      ),
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
    async (body: LinkItemPostPatchRequest) => {
      if (typeof window !== 'undefined') {
        const collections = getCollections();
        const matchedCollection = collections.find(
          (item) => item.id === collection?.id
        );

        if (matchedCollection) {
          if (!props.link) {
            // Create link item
            const id = uuidv4();

            const link: Link = {
              id,
              icon: `https://www.google.com/s2/favicons?domain=${body.url}&sz=96`,
              name: body.name,
              url: body.url,
            };

            matchedCollection.links = [...matchedCollection.links, link];
            setCollection(matchedCollection);
          } else {
            // Check for link to edit
            const matchedLink = matchedCollection.links?.find(
              (link) => link.id === props.link?.id
            );
            if (matchedLink) {
              // Edit data
              matchedLink.icon = `https://www.google.com/s2/favicons?domain=${body.url}&sz=96`;
              matchedLink.name = body.name;
              matchedLink.url = body.url;
              setCollection(matchedCollection as Collection);
            }
          }
          updateCollections(collections);
          props.onClose();
        }
      }
    },
    // eslint-disable-next-line
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
        defaultValue={props.link?.name}
        label={t('collection:link.create_edit.name.label')}
        message={errors?.name && errors.name.message?.toString()}
        placeholder={t(
          'collection:link.create_edit.name.placeholder'
        ).toString()}
        register={register('name')}
        state={errors?.name && ResultState.Error}
      />
      <Input
        classes={styles['link-item-create-edit-item']}
        defaultValue={props.link?.url}
        label={t('collection:link.create_edit.url.label')}
        message={errors?.url && errors.url.message?.toString()}
        placeholder={t(
          'collection:link.create_edit.url.placeholder'
        ).toString()}
        register={register('url')}
        state={errors?.url && ResultState.Error}
      />
      <div className={styles['link-item-create-edit-actions']}>
        <TextButtonOutlined type="submit">
          {t('common:submit')}
        </TextButtonOutlined>
      </div>
    </form>
  );
};

export default memo(LinkItemCreateEdit);
