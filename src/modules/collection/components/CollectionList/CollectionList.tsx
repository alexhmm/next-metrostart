import { FC, memo, useCallback } from 'react';
import Link from 'next/link';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DraggableProvided,
} from '@hello-pangea/dnd';
import { Box } from '@mui/material';

// Stores
import useCollectionStore from '@/src/modules/collection/collection.store';

// Styles
import styles from './CollectionList.module.scss';

// Utils
import { getCollections, updateCollections } from '../../collection.utils';

type CollectionListLinkProps = {
  id: string;
  name: string;
  provided: DraggableProvided;
  onClick?: () => void;
};

const CollectionListLink: FC<CollectionListLinkProps> = (props) => {
  return (
    <Link
      className={styles['collection-list-item']}
      href={`/collections/${props.id}`}
      ref={props.provided.innerRef}
      onClick={props.onClick}
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

type CollectionListProps = {
  onClick?: () => void;
};

const CollectionList: FC<CollectionListProps> = (props) => {
  // Collection store state
  const [collections, setCollections] = useCollectionStore((state) => [
    state.collections,
    state.setCollections,
  ]);

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

  return (
    <div className={styles['collection-list']}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div
              className={styles['collection-list-sort']}
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
                      onClick={props.onClick}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default memo(CollectionList);
