import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

// Icons
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import UploadIcon from '@mui/icons-material/Upload';

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
      name: t('collection:title'),
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
        icon: <AddIcon />,
        title: t('collection:link.create_edit.title_create'),
      },
      {
        action: CollectionAction.Sort,
        // icon: <DragHandleIcon />,
        icon: <SwapVertIcon />,
        title: t('collection:link.sort.title'),
      },
      {
        action: CollectionAction.Update,
        icon: <EditIcon />,
        title: t('collection:create_edit.title_edit'),
      },
      {
        action: CollectionAction.Export,
        icon: <DownloadIcon />,
        title: t('collection:export'),
      },
      {
        action: CollectionAction.Delete,
        icon: <DeleteOutlineIcon />,
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
        icon: <AddIcon />,
        title: t('collection:create_edit.title_create'),
      },
      {
        action: CollectionAction.Import,
        icon: <UploadIcon />,
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
        icon: <EditIcon />,
        title: t('collection:link.create_edit.title_edit'),
      },
      {
        action: CrudAction.Delete,
        icon: <DeleteOutlineIcon />,
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
