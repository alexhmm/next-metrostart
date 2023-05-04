// Types
import { Collection } from './collection.types';

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
