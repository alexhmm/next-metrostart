import { create } from 'zustand';

// Types
import {
  Collection,
  CollectionWithoutLinks,
} from '@/src/modules/collection/collection.types';

export interface CollectionState {
  collection: Collection | undefined;
  collectionCreate: boolean;
  collections: CollectionWithoutLinks[];
  setCollection: (collection: Collection | undefined) => void;
  setCollectionCreate: (collectionCreate: boolean) => void;
  setCollections: (collections: CollectionWithoutLinks[]) => void;
}

// #todo: Doing this in zustand store directly:
// Unhandled Runtime Error
// Error: Hydration failed because the initial UI does not match what was rendered on the server.
// const collections: Collection[] =
//   typeof window !== 'undefined' &&
//   JSON.parse(localStorage.getItem('collections') ?? '[]');
const useCollectionStore = create<CollectionState>((set, get) => ({
  // collection: collections && collections[0]?.items ? collections[0].items : [],
  collection: undefined,
  collectionCreate: false,
  collections: [],
  setCollection: (collection: Collection | undefined) => {
    set({ collection });
  },
  setCollectionCreate: (collectionCreate: boolean) => {
    set({ collectionCreate });
  },
  setCollections: (collections: CollectionWithoutLinks[]) => {
    set({ collections });
  },
}));

export default useCollectionStore;
