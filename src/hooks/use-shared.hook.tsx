import { useTranslation } from 'react-i18next';
import { useTheme } from 'next-themes';

// Icons
import DarkModeIcon from '@mui/icons-material/DarkMode';

// Types
import { HeaderMenuAction } from '../types/shared.types';
import { MenuElement, MenuItem } from '../types/ui.types';

const useShared = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  /**
   * Get header menu items.
   * @returns Header menu items
   */
  const getHeaderMenuItems = (): MenuItem[] => {
    return [
      {
        action: HeaderMenuAction.ToggleTheme,
        checked: theme === 'dark' ? true : false,
        elem: MenuElement.Checkbox,
        icon: <DarkModeIcon />,
        title: t('header:menu.dark_theme'),
      },
    ];
  };

  return {
    getHeaderMenuItems,
  };
};

export default useShared;
