import { FC, memo, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Box, Button, Typography } from '@mui/material';

// Styles
import styles from './Header.module.scss';
import Link from 'next/link';

const Header: FC = () => {
  const { resolvedTheme, theme, setTheme } = useTheme();

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
      <div className={styles['header-navigation']}></div>
      <Button
        onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
      >
        {theme === 'dark' ? 'Light Theme' : 'Dark Theme'}
      </Button>
    </Box>
  );
};

export default memo(Header);
