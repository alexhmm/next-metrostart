import { orange, red, teal } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    '2xl': true;
    '3xl': true;
    '4xl': true;
    '5xl': true;
  }

  interface Palette {
    bg: {
      card: string;
    };
  }

  interface PaletteOptions {
    bg: {
      card: string;
    };
  }

  interface PaletteColor {
    card?: string;
  }

  interface SimplePaletteColorOptions {
    card?: string;
  }
}

const error = {
  main: red[400],
};

const primary = {
  main: orange[400],
};

const secondary = {
  main: teal[400],
};

const typography = {
  fontFamily: "'Montserrat', 'sans-serif'",
};

// Create a theme instance.
export const darkTheme = createTheme({
  palette: {
    action: {
      hover: 'rgba(255, 255, 255, 0.1)',
    },
    bg: {
      card: 'rgba(255, 255, 255, 0.05)',
    },
    error,
    mode: 'dark',
    primary,
    secondary,
  },
  typography,
});

export const lightTheme = createTheme({
  palette: {
    action: {
      hover: 'rgba(0, 0, 0, 0.1)',
    },
    bg: {
      card: 'rgba(0, 0, 0, 0.05)',
    },
    error,
    mode: 'light',
    primary,
    secondary,
  },
  typography,
});
