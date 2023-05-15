// Types
import { Collection, CollectionWithoutLinks } from './collection.types';

/**
 * Get a collection by id.
 * @param id Collection id
 * @returns Collection
 */
export const getCollectionById = (id?: string): Collection | undefined => {
  if (id && typeof window !== 'undefined') {
    let collections = JSON.parse(
      localStorage.getItem('collections') ?? '[]'
    ) as Collection[];
    return collections.find((collection) => collection.id == id);
  }
  return undefined;
};

/**
 * Maps collections without links.
 * @param collections Collection array
 * @returns Collections without links
 */
export const mapCollectionsWithoutLinks = (
  collections: Collection[]
): CollectionWithoutLinks[] => {
  return collections.map((collection) => {
    return {
      id: collection.id,
      description: collection.description,
      name: collection.name,
    };
  });
};
