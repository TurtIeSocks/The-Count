import { extendTheme } from '@mui/material/styles'

const baseTheme = {
  primary: { main: '#ff5722' },
  secondary: { main: '#00b0ff' },
}

export const theme = extendTheme({
  colorSchemes: { light: { palette: baseTheme }, dark: { palette: baseTheme } },
  typography: { fontFamily: '"Roboto","Helvetica","Arial",sans-serif' },
  components: {
    MuiGrid: {
      defaultProps: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      },
    },
    MuiPaper: { defaultProps: { elevation: 0 } },
  },
})
