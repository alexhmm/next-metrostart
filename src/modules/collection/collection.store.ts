import { create } from 'zustand';

// Types
import { GridItem } from '@/src/modules/collection/collection.types';

export interface CollectionState {
  collection: GridItem[];
  setCollection: (collection: GridItem[]) => void;
}

const useCollectionStore = create<CollectionState>((set) => ({
  collection: [
    {
      id: '1',
      favicon: 'https://github.com/fluidicon.png',
      title: 'Github',
      url: 'https://github.com',
    },
    {
      id: '2',
      favicon:
        'https://assets.nflxext.com/us/ffe/siteui/common/icons/nficon2016.png',
      title: 'Netflix',
      url: 'https://www.netflix.com/',
    },
  ],
  setCollection: (collection: GridItem[]) => {
    set({ collection });
  },
}));

export default useCollectionStore;
