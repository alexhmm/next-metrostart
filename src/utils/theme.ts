import { orange, red, teal } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

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
    error,
    mode: 'dark',
    primary,
    secondary,
  },
  typography,
});

export const lightTheme = createTheme({
  palette: {
    error,
    mode: 'light',
    primary,
    secondary,
  },
  typography,
});
