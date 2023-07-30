import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

// Types
import { CollectionAction } from './collection.types';
import { CrudAction, MenuItem } from '@/src/types/shared.types';

const useCollection = () => {
  const { t } = useTranslation();

  /**
   * Create empty collection item.
   * @returns Empty collection
   */
  const createCollection = () => {
    const id = uuidv4();

    return {
      id,
      links: [],
      name: `${t('collection:title')} ${id}`,
    };
  };

  /**
   * Get collection actions.
   * @returns MenuItem array
   */
  const getCollectionActions = (): MenuItem[] => {
    return [
      {
        action: CollectionAction.Create,
        title: t('collection:link.create_edit.title_create'),
      },
      {
        action: CollectionAction.Sort,
        title: t('collection:link.sort.title'),
      },
      {
        action: CollectionAction.Update,
        title: t('collection:create_edit.title_edit'),
      },
      {
        action: CollectionAction.Export,
        title: t('collection:export'),
      },
      {
        action: CollectionAction.Delete,
        title: t('collection:delete.title'),
      },
    ];
  };

  /**
   * Get collection list actions.
   * @returns MenuItem array
   */
  const getCollectionListActions = (): MenuItem[] => {
    return [
      {
        action: CollectionAction.Create,
        title: t('collection:create_edit.title_create'),
      },
      {
        action: CollectionAction.Import,
        title: t('collection:import'),
      },
    ];
  };

  /**
   * Get link menu items.
   * @returns MenuItem
   */
  const getLinkMenuActions = (): MenuItem[] => {
    return [
      {
        action: CrudAction.Update,
        title: t('collection:link.create_edit.title_edit'),
      },
      {
        action: CrudAction.Delete,
        title: t('collection:link.delete'),
      },
    ];
  };

  return {
    createCollection,
    getCollectionActions,
    getCollectionListActions,
    getLinkMenuActions,
  };
};

export default useCollection;
