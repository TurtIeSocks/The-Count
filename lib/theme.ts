import {
  createTheme,
  responsiveFontSizes,
  type Theme,
} from '@mui/material/styles'

export const theme: Theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        light: '#ff784e',
        main: '#ff5722',
        dark: '#b23c17',
        contrastText: '#fff',
      },
      secondary: {
        light: '#33bfff',
        main: '#00b0ff',
        dark: '#007bb2',
        contrastText: '#fff',
      },
      background: {
        paper: '#333333',
        default: '#333333',
      },
      success: {
        main: '#00e676',
      },
      text: {
        primary: '#bdbdbd',
        secondary: 'white',
      },
    },
    components: {
      MuiGrid2: {
        defaultProps: {
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        },
      },
      MuiPaper: {
        defaultProps: {
          elevation: 0,
        },
      },
    },
  }),
)
