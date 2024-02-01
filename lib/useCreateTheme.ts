import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import { useStorage } from './store'
import { useMemo } from 'react'

export const useCreateTheme = () => {
  const darkMode = useStorage((state) => state.darkMode)

  return useMemo(
    () =>
      responsiveFontSizes(
        createTheme({
          palette: {
            mode: darkMode ? 'dark' : 'light',
          },
          // palette: {
          //   primary: {
          //     light: '#ff784e',
          //     main: '#ff5722',
          //     dark: '#b23c17',
          //     contrastText: '#fff',
          //   },
          //   secondary: {
          //     light: '#33bfff',
          //     main: '#00b0ff',
          //     dark: '#007bb2',
          //     contrastText: '#fff',
          //   },
          //   background: {
          //     paper: '#333333',
          //     default: '#333333',
          //   },
          //   success: {
          //     main: '#00e676',
          //   },
          //   text: {
          //     primary: '#bdbdbd',
          //     secondary: 'white',
          //   },
          // },
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
      ),
    [darkMode],
  )
}
