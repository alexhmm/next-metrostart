import { FC, memo, useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Box } from '@mui/material';
import { useFilePicker } from 'use-file-picker';

// Components
import CollectionList from '../CollectionList/CollectionList';

// Hooks
import useCollection from '../../use-collection.hook';

// Stores
import useCollectionStore from '@/src/modules/collection/collection.store';

// Styles
import styles from './CollectionNav.module.scss';

// Types
import { Collection, CollectionAction } from '../../collection.types';

// UI
import Menu from '@/src/ui/Menu/Menu';

// Utils
import {
  getCollectionById,
  getCollections,
  updateCollections,
} from '../../collection.utils';

const CollectionNav: FC = () => {
  const { getCollectionListActions } = useCollection();
  const [openFileSelector, { filesContent }] = useFilePicker({
    accept: '.json',
    multiple: false,
  });
  const router = useRouter();
  const { t } = useTranslation();

  // Refs
  const listRef = useRef<HTMLDivElement | null>(null);
  const listContentRef = useRef<HTMLElement | null>(null);

  // Component state
  const [scrollTopLast, setScrollTopLast] = useState<number>(0);

  // Collection store state
  const [setCollection, setCollectionCreate, setCollections] =
    useCollectionStore((state) => [
      state.setCollection,
      state.setCollectionCreate,
      state.setCollections,
    ]);

  // ####### //
  // EFFECTS //
  // ####### //

  // Calculate sticky list on scroll
  useEffect(() => {
    const onScroll = () => {
      if (listRef.current && listContentRef.current) {
        const scrollTop = window.scrollY;
        setScrollTopLast(scrollTop);
        const viewportHeight = window.innerHeight;
        const listContentHeight =
          listContentRef.current.getBoundingClientRect().height;
        const listTop =
          listRef.current.getBoundingClientRect().top + window.scrollY;
        if (
          scrollTop > scrollTopLast &&
          scrollTop >= listContentHeight - viewportHeight + listTop
        ) {
          listContentRef.current.style.position = 'sticky';
          listContentRef.current.style.top = `-${
            listContentHeight - viewportHeight
          }px`;
        }
        // #todo: Scroll back immediately on scroll up
      }
    };
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [listRef, listContentRef, scrollTopLast]);

  // Import collection by json file
  useEffect(() => {
    if (filesContent && filesContent.length > 0) {
      const collectionImport: Collection = JSON.parse(filesContent[0].content);
      if (
        collectionImport.id &&
        collectionImport.links &&
        collectionImport.name
      ) {
        const matchedCollection = getCollectionById(collectionImport.id);
        if (!matchedCollection) {
          const collectionsStorage = getCollections();
          collectionsStorage.push(collectionImport);

          // Update LocalStorage
          updateCollections(collectionsStorage);

          // Update store
          setCollection(collectionImport);
          setCollections(collectionsStorage);

          router.push(`/collections/${collectionImport.id}`);
        }
      }
    }
  }, [filesContent]);

  // ######### //
  // CALLBACKS //
  // ######### //

  /**
   * Handler to link menu action.
   * @param action CrudAction
   */
  const onMenuAction = useCallback((action: CollectionAction) => {
    switch (action) {
      case CollectionAction.Create:
        setCollectionCreate(true);
        break;
      case CollectionAction.Import:
        openFileSelector();
        break;
      default:
        break;
    }
  }, []);

  return (
    <div className={styles['collection-nav']} ref={listRef}>
      <Box
        className={styles['collection-nav-content']}
        ref={listContentRef}
        sx={{ backgroundColor: 'background.paper' }}
      >
        <div className={styles['collection-nav-content-header']}>
          <Menu
            items={getCollectionListActions()}
            onAction={onMenuAction}
            title={t('common:your_library')}
            variant="h6"
          />
        </div>
        <CollectionList />
      </Box>
    </div>
  );
};

export default memo(CollectionNav);
