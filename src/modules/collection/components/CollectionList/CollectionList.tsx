import { FC, memo, useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DraggableProvided,
} from '@hello-pangea/dnd';
import { Box } from '@mui/material';
import { useFilePicker } from 'use-file-picker';

// Hooks
import useCollection from '../../use-collection.hook';

// Stores
import useCollectionStore from '@/src/modules/collection/collection.store';

// Styles
import styles from './CollectionList.module.scss';

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

type CollectionListLinkProps = {
  id: string;
  name: string;
  provided: DraggableProvided;
};

const CollectionListLink: FC<CollectionListLinkProps> = (props) => {
  return (
    <Link
      className={styles['collection-list-item']}
      href={`/collections/${props.id}`}
      ref={props.provided.innerRef}
      {...props.provided.draggableProps}
      {...props.provided.dragHandleProps}
    >
      <Box
        className={styles['collection-list-item-content']}
        sx={{
          ':hover': {
            backgroundColor: 'action.hover',
          },
        }}
      >
        {props.name}
      </Box>
    </Link>
  );
};

const CollectionList: FC = () => {
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
  const [collections, setCollection, setCollectionCreate, setCollections] =
    useCollectionStore((state) => [
      state.collections,
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
   * Handler on drag end.
   * @param result Result
   */
  const onDragEnd = useCallback((result: any) => {
    // Dropped outside the list
    if (!result.destination) {
      return;
    }

    // Reorder using index of source and destination
    const updatedCollections = getCollections();
    const [removed] = updatedCollections.splice(result.source.index, 1);
    // Put the removed collection into destination
    updatedCollections.splice(result.destination.index, 0, removed);

    // Update LocalStorage
    updateCollections(updatedCollections);

    // Update store
    setCollections(updatedCollections);
  }, []);

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
    <div className={styles['collection-list']} ref={listRef}>
      <Box
        className={styles['collection-list-content']}
        ref={listContentRef}
        sx={{ backgroundColor: 'background.paper' }}
      >
        <div className={styles['collection-list-content-header']}>
          <Menu
            items={getCollectionListActions()}
            onAction={onMenuAction}
            title={t('collection:your_library')}
            variant="h6"
          />
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div
                className={styles['collection-list-content-sort']}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {collections.map((collection, index) => (
                  <Draggable
                    key={collection.id}
                    draggableId={collection.id}
                    index={index}
                  >
                    {(provided) => (
                      <CollectionListLink
                        id={collection.id}
                        name={collection.name}
                        provided={provided}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Box>
    </div>
  );
};

export default memo(CollectionList);
