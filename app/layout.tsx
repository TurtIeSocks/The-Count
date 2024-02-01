import * as React from 'react'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import { Metadata } from 'next'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import GitHubIcon from '@mui/icons-material/GitHub'

import { ThemeWrapper } from '@components/Theme'
import ThemeToggle from '@components/ThemeToggle'

import styles from '../styles.module.css'

export const metadata: Metadata = {
  title: 'The Count',
}

export default async function HomeLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeWrapper>
            <Box className={styles.layout} height="100vh">
              <Typography
                color="secondary"
                variant="h1"
                fontWeight="bold"
                component="header"
              >
                The Count
              </Typography>
              {props.children}
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
          </ThemeWrapper>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
