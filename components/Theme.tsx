'use client'

import { theme } from '@lib/theme'
import CssBaseline from '@mui/material/CssBaseline'
import React from 'react'
import { globalStyles } from './Global'
import { getInitColorSchemeScript } from '@mui/material/styles'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      {getInitColorSchemeScript({ defaultMode: 'system' })}
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        {globalStyles}
        {children}
      </CssVarsProvider>
    </>
  )
}
