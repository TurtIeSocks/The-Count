import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import type {} from '@mui/material/themeCssVarsAugmentation'
import { AppProps } from 'next/app'
import Head from 'next/head'
import createEmotionCache from '@lib/createEmotionCache'
import { theme } from '@lib/theme'
import Box from '@mui/material/Box'
import GitHubIcon from '@mui/icons-material/GitHub'

import styles from '../styles.module.css'
import Typography from '@mui/material/Typography'
import ThemeToggle from '@components/ThemeToggle'
import IconButton from '@mui/material/IconButton'

const clientSideEmotionCache = createEmotionCache()

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: MyAppProps) {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <CssVarsProvider theme={theme} defaultMode="system">
        <CssBaseline />
        <Box className={styles.layout} height="100vh">
          <Typography
            color="secondary"
            variant="h1"
            fontWeight="bold"
            component="header"
          >
            The Count
          </Typography>
          <Component {...pageProps} />
          <Box className={styles.footer}>
            <ThemeToggle />
            <IconButton
              href="https://github.com/TurtIeSocks/The-Count"
              target="_blank"
              rel="noreferrer"
              size="large"
            >
              <GitHubIcon fontSize="large" />
            </IconButton>
          </Box>
        </Box>
      </CssVarsProvider>
    </CacheProvider>
  )
}
