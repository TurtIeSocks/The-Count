'use client'

import * as React from 'react'
import { CacheProvider } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import { CssVarsProvider } from '@mui/material/styles'
import type {} from '@mui/material/themeCssVarsAugmentation'

import { createEmotionCache } from '@lib/createEmotionCache'
import { theme } from '@lib/theme'
import { Header } from '@components/Header'
import { Footer } from '@components/footer'

import styles from '../styles.module.css'

const clientSideEmotionCache = createEmotionCache()

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <CssVarsProvider theme={theme} defaultMode="system">
        <CssBaseline />
        <Box className={styles.layout} height="100svh">
          <Header />
          {children}
          <Footer />
        </Box>
      </CssVarsProvider>
    </CacheProvider>
  )
}
