import { FC, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';

// Utils
import { darkTheme, lightTheme } from '../utils/theme';

const ThemeProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { resolvedTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState(darkTheme);

  // Set theme
  useEffect(() => {
    resolvedTheme === 'light'
      ? setCurrentTheme(lightTheme)
      : setCurrentTheme(darkTheme);
  }, [resolvedTheme]);

  return (
    <MuiThemeProvider theme={currentTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
