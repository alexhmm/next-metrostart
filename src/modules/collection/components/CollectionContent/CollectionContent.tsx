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

// UI
import Dialog from '@/src/ui/Dialog/Dialog';
import Menu from '@/src/ui/Menu/Menu';
import TextButtonOutlined from '@/src/ui/TextButtonOutlined/TextButtonOutlined';
import { Collection } from '../../collection.types';

type CollectionContentProps = {
  collection: Collection;
};

const CollectionContent: FC<CollectionContentProps> = (props) => {
  const { collection } = props;

  const { getMenuActions } = useCollection();
  const { t } = useTranslation();

  // Component state
  const [collectionDelete, setCollectionDelete] = useState<string | undefined>(
    undefined
  );
  const [collectionEdit, setCollectionEdit] = useState<string | undefined>(
    undefined
  );
  const [linkCreateEdit, setLinkCreateEdit] = useState<boolean>(false);

  // Collection store state
  const [collectionCreate, setCollectionCreate] = useCollectionStore(
    (state) => [state.collectionCreate, state.setCollectionCreate]
  );

  // ######### //
  // CALLBACKS //
  // ######### //

  /**
   * Handler on menu action
   */
  const onMenuAction = useCallback(
    (action: CrudAction) => {
      switch (action) {
        case CrudAction.Create:
          setLinkCreateEdit(true);
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
            classes={styles['collection-content-header-title-menu']}
            icon={['fas', 'ellipsis-v']}
            items={getMenuActions()}
            onAction={onMenuAction}
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
      {(!collection || (collection?.links && collection?.links.length < 1)) && (
        <TextButtonOutlined
          classes="w-fit"
          onClick={() => setLinkCreateEdit(true)}
        >
          {t<any>('collection:link.create_edit.title_create')}
        </TextButtonOutlined>
      )}
      <div className={styles['collection-content-main']}>
        {collection?.links?.map((link) => (
          <LinkItem key={link.id} item={link} />
        ))}
        {collection?.links && collection?.links?.length > 0 && (
          <LinkItem
            type={CrudAction.Create}
            onClick={() => onMenuAction(CrudAction.Create)}
          />
        )}
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
        open={linkCreateEdit}
        title={t<any>('collection:link.create_edit.title_create').toString()}
        onClose={() => setLinkCreateEdit(false)}
      >
        <LinkItemCreateEdit onClose={() => setLinkCreateEdit(false)} />
      </Dialog>
    </div>
  );
};

export default memo(CollectionContent);
