import { create } from 'zustand';

// Types
import { LinkItem } from '@/src/modules/collection/collection.types';

export interface CollectionState {
  collection: LinkItem[];
  setCollection: (collection: LinkItem[]) => void;
}

const useCollectionStore = create<CollectionState>((set) => ({
  collection: [
    {
      id: '1',
      favicon: 'https://github.com/fluidicon.png',
      name: 'Github',
      url: 'https://github.com',
    },
    {
      id: '2',
      favicon:
        'https://assets.nflxext.com/us/ffe/siteui/common/icons/nficon2016.png',
      name: 'Netflix',
      url: 'https://www.netflix.com/',
    },
  ],
  setCollection: (collection: LinkItem[]) => {
    set({ collection });
  },
}));

export default useCollectionStore;
