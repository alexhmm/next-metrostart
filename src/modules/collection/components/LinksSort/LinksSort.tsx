import { FC, memo, useCallback, useEffect, useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DraggableProvided,
} from '@hello-pangea/dnd';

// Stores
import useCollectionStore from '../../collection.store';

// Styles
import styles from './LinksSort.module.scss';

// Types
import { Link } from '../../collection.types';

type LinkSortableItemProps = {
  link: Link;
  provided: DraggableProvided;
};

const LinkSortableItem: FC<LinkSortableItemProps> = (props) => {
  return (
    <div
      className={styles['link-sortable-item']}
      ref={props.provided.innerRef}
      {...props.provided.draggableProps}
      {...props.provided.dragHandleProps}
    >
      {props.link.icon && (
        <img
          alt={props.link.name}
          className={styles['link-sortable-item-image']}
          src={props.link.icon}
        />
      )}
      <span className={styles['link-sortable-item-name']}>
        {props.link.name}
      </span>
    </div>
  );
};

type LinksSortProps = {
  id: string;
  onClose: () => void;
  onSetLinks: (links: Link[]) => void;
};

const LinksSort: FC<LinksSortProps> = (props) => {
  // Collection store state
  const [collection] = useCollectionStore((state) => [state.collection]);

  const [links, setLinks] = useState<Link[]>([]);

  // Set links to sort on mount
  useEffect(() => {
    collection && collection.links && setLinks(collection.links);
  }, [collection]);

  /**
   * Handler on drag end.
   * @param result Result
   */
  const onDragEnd = useCallback(
    (result: any) => {
      // Dropped outside the list
      if (!result.destination) {
        return;
      }

      // Reorder using index of source and destination
      const updatedLinks = [...links];
      const [removed] = updatedLinks.splice(result.source.index, 1);
      // Put the removed link into destination
      updatedLinks.splice(result.destination.index, 0, removed);

      setLinks(updatedLinks);
      props.onSetLinks(updatedLinks);
    },
    // eslint-disable-next-line
    [links]
  );

  return (
    <div className={styles['links-sort']}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div
              className={styles['links-sort-list']}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {links.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <LinkSortableItem link={item} provided={provided} />
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

export default memo(LinksSort);
