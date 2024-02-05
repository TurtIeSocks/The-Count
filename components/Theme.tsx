import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'

import { theme } from '@lib/theme'

import { globalStyles } from './Global'

export const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      {globalStyles}
      {children}
    </CssVarsProvider>
  )
}
