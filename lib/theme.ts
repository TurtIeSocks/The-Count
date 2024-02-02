import { Roboto } from 'next/font/google'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

const baseTheme = {
  primary: {
    main: '#ff5722',
  },
  secondary: {
    main: '#00b0ff',
  },
}

export const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: baseTheme,
    },
    dark: {
      palette: baseTheme,
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
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
})
