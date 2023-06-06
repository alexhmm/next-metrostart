import { FC, memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { Typography } from '@mui/material';

// Components
import CollectionCreateEdit from '@/src/modules/collection/components/CollectionCreateEdit/CollectionCreateEdit';
import CollectionDelete from '@/src/modules/collection/components/CollectionDelete/CollectionDelete';
import LinkItem from '@/src/modules/collection/components/LinkItem/LinkItem';
import LinkItemCreateEdit from '@/src/modules/collection/components/LinkItemCreateEdit/LinkItemCreateEdit';

// Hooks
import useCollection from '@/src/modules/collection/use-collection.hook';

// Stores
import useCollectionStore from '@/src/modules/collection/collection.store';

// Styles
import styles from './CollectionContent.module.scss';

// Types
import { CrudAction } from '@/src/types/shared.types';
import {
  Collection,
  LinkItem as ILinkItem,
} from '@/src/modules/collection/collection.types';

// UI
import Dialog from '@/src/ui/Dialog/Dialog';
import Menu from '@/src/ui/Menu/Menu';
import TextButtonOutlined from '@/src/ui/TextButtonOutlined/TextButtonOutlined';

// Utils
import { getCollections, updateCollections } from '../../collection.utils';

type CollectionContentProps = {
  collection: Collection;
};

const CollectionContent: FC<CollectionContentProps> = (props) => {
  const { collection } = props;
  const { getCollectionMenuActions } = useCollection();
  const { t } = useTranslation();

  // Component state
  const [collectionDelete, setCollectionDelete] = useState<string | undefined>(
    undefined
  );
  const [collectionEdit, setCollectionEdit] = useState<string | undefined>(
    undefined
  );
  const [linkCreate, setLinkCreate] = useState<boolean>(false);
  const [linkEdit, setLinkEdit] = useState<ILinkItem | undefined>(undefined);

  // Collection store state
  const [collectionCreate, setCollection, setCollectionCreate] =
    useCollectionStore((state) => [
      state.collectionCreate,
      state.setCollection,
      state.setCollectionCreate,
    ]);

  // ######### //
  // CALLBACKS //
  // ######### //

  /**
   * Handler on collection menu action.
   * @param action CrudAction
   */
  const onCollectionMenuAction = useCallback(
    (action: CrudAction) => {
      switch (action) {
        case CrudAction.Create:
          setLinkCreate(true);
          break;
        case CrudAction.Delete:
          collection?.id && setCollectionDelete(collection.id);
          break;
        case CrudAction.Update:
          collection?.id && setCollectionEdit(collection.id);
          break;
        default:
          break;
      }
    },
    [collection]
  );

  /**
   * Handler to delete link item by id.
   * @param id Link id
   */
  const onLinkDelete = useCallback((id: string) => {
    if (typeof window !== 'undefined') {
      const collections = getCollections();
      const matchedCollection = collections.find(
        (item) => item.id === collection?.id
      );
      if (matchedCollection) {
        const matchedLinkIndex = matchedCollection.links?.findIndex(
          (link) => link.id === id
        );
        if (matchedLinkIndex > -1) {
          matchedCollection.links.splice(matchedLinkIndex, 1);
          updateCollections(collections);
          setCollection(matchedCollection);
        }
      }
    }
  }, []);

  return (
    <div className={styles['collection-content']}>
      <div className={styles['collection-content-header']}>
        <div className={styles['collection-content-header-title']}>
          <Typography
            className={styles['collection-content-header-title-text']}
            variant="h5"
          >
            {/* #TODO: Type 'TFunctionDetailedResult<never>' is not assignable to type 'ReactI18NextChildren'. */}
            {collection?.name ?? t<any>('collection:title')}
          </Typography>
          <Menu
            className={styles['collection-content-header-title-menu']}
            icon={['fas', 'ellipsis-v']}
            items={getCollectionMenuActions()}
            onAction={onCollectionMenuAction}
          />
        </div>
        {collection?.description && (
          <Typography
            color="text.secondary"
            className={styles['collection-content-header-description']}
          >
            {collection.description}
          </Typography>
        )}
      </div>
      <div className={styles['collection-content-main']}>
        {collection?.links?.map((link) => (
          <LinkItem
            key={link.id}
            link={link}
            onDelete={() => onLinkDelete(link.id)}
            onEdit={() => setLinkEdit(link)}
          />
        ))}
        <LinkItem
          type={CrudAction.Create}
          onClick={() => onCollectionMenuAction(CrudAction.Create)}
        />
      </div>
      <Dialog
        open={collectionCreate || !!collectionEdit}
        title={t<any>('collection:create_edit.title_create').toString()}
        onClose={() => {
          setCollectionCreate(false);
          setCollectionEdit(undefined);
        }}
      >
        <CollectionCreateEdit
          id={collectionEdit}
          onClose={() => {
            setCollectionCreate(false);
            setCollectionEdit(undefined);
          }}
        />
      </Dialog>
      <Dialog
        open={!!collectionDelete}
        title={t<any>('collection:delete.title').toString()}
        onClose={() => setCollectionDelete(undefined)}
      >
        {collection && collection.id && (
          <CollectionDelete
            id={collection.id}
            onClose={() => setCollectionDelete(undefined)}
          />
        )}
      </Dialog>
      <Dialog
        open={linkCreate}
        title={t<any>('collection:link.create_edit.title_create').toString()}
        onClose={() => setLinkCreate(false)}
      >
        <LinkItemCreateEdit onClose={() => setLinkCreate(false)} />
      </Dialog>
      <Dialog
        open={!!linkEdit}
        title={t<any>('collection:link.create_edit.title_edit').toString()}
        onClose={() => setLinkEdit(undefined)}
      >
        <LinkItemCreateEdit
          link={linkEdit}
          onClose={() => setLinkEdit(undefined)}
        />
      </Dialog>
    </div>
  );
};

export default memo(CollectionContent);
