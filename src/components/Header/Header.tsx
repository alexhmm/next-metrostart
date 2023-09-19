import { FC, memo, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Box, Typography } from '@mui/material';

// Hooks
import useShared from '@/src/hooks/use-shared.hook';

// Icons
import MenuIcon from '@mui/icons-material/Menu';

// Styles
import styles from './Header.module.scss';
import Link from 'next/link';

// Types
import { HeaderMenuAction } from '@/src/types/shared.types';

// UI
import IconMenu from '@/src/ui/Menu/IconMenu';

const Header: FC = () => {
  const { getHeaderMenuItems } = useShared();
  const { resolvedTheme, setTheme } = useTheme();

  // Component state
  const [hasMounted, setHasMounted] = useState(false);

  // Error: Text content does not match server-rendered HTML.
  // Warning: Text content did not match. Server: "Dark Theme" Client: "Light Theme"
  // See more info here: https://nextjs.org/docs/messages/react-hydration-error
  // As this error is related to SSR, it's needed to confirm the component is mounted on the frontend side.
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  // ######### //
  // CALLBACKS //
  // ######### //

  const onMenuAction = (action: HeaderMenuAction) => {
    switch (action) {
      case HeaderMenuAction.ToggleTheme:
        setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
        break;
      default:
        break;
    }
  };

  return (
    <Box
      className={styles['header']}
      component="header"
      sx={{
        backgroundColor: 'bg.header',
        borderColor: 'background.default',
      }}
    >
      <Link href="/">
        <Typography className={styles['header-title']} variant="h6">
          Metrostart
        </Typography>
      </Link>
      <IconMenu
        items={getHeaderMenuItems()}
        icon={<MenuIcon />}
        onAction={onMenuAction}
      />
    </Box>
  );
};

export default memo(Header);
