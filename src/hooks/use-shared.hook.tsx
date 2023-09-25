import { useTranslation } from 'react-i18next';
import { useTheme } from 'next-themes';

// Hooks
import useBreakpoints from './use-breakpoints.hook';

// Icons
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ListIcon from '@mui/icons-material/List';

// Types
import {
  HeaderMenuAction,
  MenuElement,
  MenuItem,
} from '@/src/types/shared.types';

const useShared = () => {
  const { lgDown } = useBreakpoints();
  const { resolvedTheme } = useTheme();
  const { t } = useTranslation();

  /**
   * Get header menu items.
   * @returns Header menu items
   */
  const getHeaderMenuItems = (): MenuItem[] => {
    const items: MenuItem[] = [];
    lgDown &&
      items.push({
        action: HeaderMenuAction.CollectionList,
        elem: MenuElement.Button,
        icon: <ListIcon />,
        title: t('common:your_library'),
      });

    items.push({
      action: HeaderMenuAction.ToggleTheme,
      checked: resolvedTheme === 'dark' ? true : false,
      elem: MenuElement.Checkbox,
      icon: <DarkModeIcon />,
      title: t('common:menu.dark_theme'),
    });

    return items;
  };

  return {
    getHeaderMenuItems,
  };
};

export default useShared;
