'use client'
import { Roboto } from 'next/font/google'
import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import { useMemo } from 'react'
import { useStorage } from './store'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const useCreateTheme = () => {
  const darkMode = useStorage((state) => state.darkMode)

  return useMemo(
    () =>
      responsiveFontSizes(
        createTheme({
          palette: {
            mode: darkMode ? 'dark' : 'light',
            primary: {
              main: '#ff5722',
            },
            secondary: {
              main: '#00b0ff',
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
        }),
      ),
    [darkMode],
  )
}
