import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#002B3F',       // azul oscuro
      contrastText: '#fcfefc'
    },
    secondary: {
      main: '#F4B535',       // amarillo
      contrastText: '#0D4863'
    },
    background: {
      default: '#fcfefc',    // fondo general claro
      paper: '#ffffff'       // para cards, modales, etc.
    },
    text: {
      primary: '#002B3F',
      secondary: '#333',
    },
    info: {
      main: '#0D4863'        // se puede usar como alternativa
    }
  },
  typography: {
    fontFamily: `'Inter', sans-serif`
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          fontWeight: 'bold',
          textTransform: 'none'
        }
      }
    }
  }
});

export default theme;
