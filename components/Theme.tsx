'use client'

import { useCreateTheme } from '@lib/theme'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import React from 'react'
import { globalStyles } from './Global'

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const theme = useCreateTheme()
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {globalStyles}
      {children}
    </ThemeProvider>
  )
}
