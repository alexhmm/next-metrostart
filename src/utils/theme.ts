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
      form: string;
    };
  }

  interface PaletteOptions {
    bg: {
      dialog: string;
      form: string;
    };
  }

  interface PaletteColor {
    dialog?: string;
    form?: string;
  }

  interface SimplePaletteColorOptions {
    dialog?: string;
    form?: string;
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
      hover: 'rgba(255, 255, 255, 0.1)',
    },
    bg: {
      dialog: '#232323',
      form: '#3c3c3c',
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
      paper: '#eeeeee',
    },
    action: {
      hover: 'rgba(0, 0, 0, 0.1)',
    },
    bg: {
      dialog: '#ffffff',
      form: '#eaeaea',
    },
    error,
    mode: 'light',
    primary,
    secondary,
  },
  typography,
});
