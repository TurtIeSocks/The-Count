import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material'
import { CacheProvider } from '@emotion/react'

import createEmotionCache from '../lib/emotionCache'
import { theme } from '../lib/theme'

import '../assets/index.css'

const clientSideEmotionCache = createEmotionCache()

interface Props extends AppProps {
  emotionCache?: ReturnType<typeof createEmotionCache>
}
export default function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: Props) {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>The Count</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  )
}
