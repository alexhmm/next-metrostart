import { useTranslation } from 'react-i18next';
import { useTheme } from 'next-themes';

// Icons
import DarkModeIcon from '@mui/icons-material/DarkMode';

// Types
import {
  HeaderMenuAction,
  MenuElement,
  MenuItem,
} from '@/src/types/shared.types';

const useShared = () => {
  const { resolvedTheme } = useTheme();
  const { t } = useTranslation();

  /**
   * Get header menu items.
   * @returns Header menu items
   */
  const getHeaderMenuItems = (): MenuItem[] => {
    return [
      {
        action: HeaderMenuAction.ToggleTheme,
        checked: resolvedTheme === 'dark' ? true : false,
        elem: MenuElement.Checkbox,
        icon: <DarkModeIcon />,
        title: t('common:menu.dark_theme'),
      },
    ];
  };

  return {
    getHeaderMenuItems,
  };
};

export default useShared;
