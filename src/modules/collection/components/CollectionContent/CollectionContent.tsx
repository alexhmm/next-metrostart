import { FC, memo, useCallback, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { Box, Typography } from '@mui/material';

// Components
import CollectionCreateEdit from '@/src/modules/collection/components/CollectionCreateEdit/CollectionCreateEdit';
import CollectionDelete from '@/src/modules/collection/components/CollectionDelete/CollectionDelete';
import Link from '@/src/modules/collection/components/Link/Link';
import LinkItemCreateEdit from '@/src/modules/collection/components/LinkItemCreateEdit/LinkItemCreateEdit';
import LinksSort from '../LinksSort/LinksSort';

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
  CollectionAction,
  Link as ILink,
} from '@/src/modules/collection/collection.types';

// UI
import Dialog from '@/src/ui/Dialog/Dialog';
import Menu from '@/src/ui/Menu/Menu';

// Utils
import {
  exportCollection,
  getCollections,
  updateCollections,
} from '../../collection.utils';

type CollectionContentProps = {
  collection: Collection;
};

const CollectionContent: FC<CollectionContentProps> = (props) => {
  const { collection } = props;
  const { getCollectionActions } = useCollection();
  const { t } = useTranslation();

  // Component state
  const [collectionDelete, setCollectionDelete] = useState<string | undefined>(
    undefined
  );
  const [collectionEdit, setCollectionEdit] = useState<string | undefined>(
    undefined
  );
  const [collectionSort, setCollectionSort] = useState<string | undefined>(
    undefined
  );
  const [linkCreate, setLinkCreate] = useState<boolean>(false);
  const [linkEdit, setLinkEdit] = useState<ILink | undefined>(undefined);

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
   * Handler on collection action.
   * @param action CollectionAction
   */
  const onCollectionAction = useCallback(
    (action: CollectionAction) => {
      switch (action) {
        case CollectionAction.Create:
          setLinkCreate(true);
          break;
        case CollectionAction.Delete:
          collection?.id && setCollectionDelete(collection.id);
          break;
        case CollectionAction.Export:
          exportCollection(collection);
          break;
        case CollectionAction.Sort:
          collection?.id && setCollectionSort(collection.id);
          break;
        case CollectionAction.Update:
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
    // eslint-disable-next-line
  }, []);

  return (
    <Box
      className={styles['collection-content']}
      sx={{ backgroundColor: 'background.paper' }}
    >
      <Box
        className={styles['collection-content-header']}
        sx={{ borderColor: 'background.default' }}
      >
        <div className={styles['collection-content-header-title']}>
          <Menu
            items={getCollectionActions()}
            onAction={onCollectionAction}
            title={collection?.name ?? t('collection:title')}
            variant="h5"
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
      </Box>
      <Box
        className={styles['collection-content-main']}
        sx={{ backgroundColor: 'background.default' }}
      >
        {collection?.links?.map((link) => (
          <Link
            key={link.id}
            link={link}
            onDelete={() => onLinkDelete(link.id)}
            onEdit={() => setLinkEdit(link)}
          />
        ))}
        <Link
          type={CrudAction.Create}
          onClick={() => onCollectionAction(CollectionAction.Create)}
        />
      </Box>
      <Dialog
        open={collectionCreate || !!collectionEdit}
        title={t(
          collectionCreate
            ? 'collection:create_edit.title_create'
            : 'collection:create_edit.title_edit'
        ).toString()}
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
        title={t('collection:delete.title').toString()}
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
        open={!!collectionSort}
        title={t('collection:link.sort.title').toString()}
        onClose={() => setCollectionSort(undefined)}
      >
        {collection && collection.id && (
          <LinksSort
            id={collection.id}
            onClose={() => setCollectionSort(undefined)}
          />
        )}
      </Dialog>
      <Dialog
        open={linkCreate}
        title={t('collection:link.create_edit.title_create').toString()}
        onClose={() => setLinkCreate(false)}
      >
        <LinkItemCreateEdit onClose={() => setLinkCreate(false)} />
      </Dialog>
      <Dialog
        open={!!linkEdit}
        title={t('collection:link.create_edit.title_edit').toString()}
        onClose={() => setLinkEdit(undefined)}
      >
        <LinkItemCreateEdit
          link={linkEdit}
          onClose={() => setLinkEdit(undefined)}
        />
      </Dialog>
    </Box>
  );
};

export default memo(CollectionContent);
