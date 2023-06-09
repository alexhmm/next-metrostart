import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

// Types
import { CollectionMenuAction } from './collection.types';
import { CrudAction, MenuItem } from '@/src/types/shared.types';

const useCollection = () => {
  const { t } = useTranslation();

  /**
   * Create empty collection item.
   * @returns
   */
  const createCollection = () => {
    const id = uuidv4();

    return {
      id,
      links: [],
      name: `${t<any>('collection:title')} ${id}`,
    };
  };

  /**
   * Get collection menu items.
   * @returns
   */
  const getCollectionMenuActions = (): MenuItem[] => {
    return [
      {
        action: CollectionMenuAction.Create,
        title: t<any>('collection:link.create_edit.title_create'),
      },
      {
        action: CollectionMenuAction.Sort,
        title: t<any>('collection:link.sort.title'),
      },
      {
        action: CollectionMenuAction.Update,
        title: t<any>('collection:create_edit.title_edit'),
      },
      {
        action: CollectionMenuAction.Delete,
        title: t<any>('collection:delete.title'),
      },
    ];
  };

  /**
   * Get link menu items.
   * @returns
   */
  const getLinkMenuActions = (): MenuItem[] => {
    return [
      {
        action: CrudAction.Update,
        title: t<any>('collection:link.create_edit.title_edit'),
      },
      {
        action: CrudAction.Delete,
        title: t<any>('collection:link.delete'),
      },
    ];
  };

  return {
    createCollection,
    getCollectionMenuActions,
    getLinkMenuActions,
  };
};

export default useCollection;
