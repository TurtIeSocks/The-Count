import Head from 'next/head'
import { type AppProps } from 'next/app'
import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import type {} from '@mui/material/themeCssVarsAugmentation'

import { createEmotionCache } from '@lib/createEmotionCache'
import { theme } from '@lib/theme'
import { Header } from '@components/Header'
import { Footer } from '@components/footer'

import styles from '../styles.module.css'

const clientSideEmotionCache = createEmotionCache()

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const MyApp = ({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: MyAppProps) => {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>The Count</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <CssVarsProvider theme={theme} defaultMode="system">
        <CssBaseline />
        <Box className={styles.layout} height="100svh">
          <Header />
          <Component {...pageProps} />
          <Footer />
        </Box>
      </CssVarsProvider>
    </CacheProvider>
  )
}

export default MyApp
