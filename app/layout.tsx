import * as React from 'react'
import type { Metadata, Viewport } from 'next'
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript'

import { Providers } from './providers'
import styles from '../styles.module.css'

export const metadata: Metadata = {
  title: 'The Count',
  description:
    'Search Pokemon GO IV combinations by Combat Power (CP) with advanced filters for level, generation, and type.',
  openGraph: {
    title: 'The Count',
    description:
      'Search Pokemon GO IV combinations by Combat Power (CP) with advanced filters.',
    type: 'website',
  },
}

export const viewport: Viewport = { initialScale: 1, width: 'device-width' }

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="emotion-insertion-point" content="" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
        <a href="#main-content" className={styles.skipLink}>
          Skip to main content
        </a>
        <InitColorSchemeScript defaultMode="system" />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

export default RootLayout
