import { CrudAction, MenuItem } from '@/src/types/shared.types';
import { useTranslation } from 'react-i18next';

const useCollection = () => {
  const { t } = useTranslation();

  /**
   *
   * @returns
   */
  const getMenuActions = (): MenuItem[] => {
    return [
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
    getMenuActions,
  };
};

export default useCollection;
