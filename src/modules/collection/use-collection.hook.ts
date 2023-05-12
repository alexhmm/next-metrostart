import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

// Types
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
  const getMenuActions = (): MenuItem[] => {
    return [
      {
        action: CrudAction.Create,
        title: t<any>('collection:link.create_edit.title_create'),
      },
      {
        action: CrudAction.Update,
        title: t<any>('collection:create_edit.title_edit'),
      },
      {
        action: CrudAction.Delete,
        title: t<any>('collection:delete.title'),
      },
    ];
  };

  return {
    createCollection,
    getMenuActions,
  };
};

export default useCollection;
