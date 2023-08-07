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
      dialog: string;
      header: string;
      menu: string;
    };
  }

  interface PaletteOptions {
    bg: {
      dialog: string;
      header: string;
      menu: string;
    };
  }

  interface PaletteColor {
    dialog?: string;
    header?: string;
    menu?: string;
  }

  interface SimplePaletteColorOptions {
    dialog?: string;
    header?: string;
    menu?: string;
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
    background: {
      paper: '#1f1f1f',
    },
    action: {
      hover: 'rgba(255, 255, 255, 0.08)',
    },
    bg: {
      dialog: '#232323',
      header: '#1a1a1a',
      menu: '#232323',
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
    background: {
      default: '#eeeeee',
      paper: '#ffffff',
    },
    action: {
      hover: 'rgba(0, 0, 0, 0.04)',
    },
    bg: {
      dialog: '#ffffff',
      header: '#f6f6f6',
      menu: '#f9f9f9',
    },
    error,
    mode: 'light',
    primary,
    secondary,
  },
  typography,
});
