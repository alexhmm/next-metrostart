// Types
import { Collection, CollectionWithoutLinks } from './collection.types';

/**
 * Get collections from LocalStorage.
 * @returns Collection array
 */
export const getCollections = (): Collection[] => {
  return JSON.parse(
    localStorage.getItem('collections') ?? '[]'
  ) as Collection[];
};

/**
 * Update collections in LocalStorage.
 * @param collections Collection array
 */
export const updateCollections = (collections: Collection[]) => {
  localStorage.setItem('collections', JSON.stringify(collections));
};

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

/**
 * Update a collection with new data.
 * @param updatedCollection Collection
 */
export const updateCollection = (
  updatedCollection: Collection
): Collection[] => {
  const collections = getCollections();
  if (collections && collections.length > 0) {
    const matchedCollection = collections.find(
      (collection) => collection.id == updatedCollection.id
    );
    if (matchedCollection) {
      matchedCollection.description = updatedCollection.description;
      matchedCollection.links = updatedCollection.links;
      matchedCollection.name = updatedCollection.name;
      updateCollections(collections);
      return collections;
    }
  }
  return [];
};
