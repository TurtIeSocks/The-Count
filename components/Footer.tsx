import * as React from 'react'
import dynamic from 'next/dynamic'
import Box from '@mui/material/Box'
import GitHubIcon from '@mui/icons-material/GitHub'
import IconButton from '@mui/material/IconButton'

import styles from '../styles.module.css'

const DynThemeToggle = dynamic(() => import('@components/ThemeToggle'), {
  ssr: false,
})

export const Footer = React.memo(
  () => {
    return (
      <Box component="footer" className={styles.footer}>
        <DynThemeToggle />
        <IconButton
          href="https://github.com/TurtIeSocks/The-Count"
          target="_blank"
          rel="noreferrer"
          size="large"
        >
          <GitHubIcon fontSize="large" />
        </IconButton>
      </Box>
    )
  },
  () => true,
)

Footer.displayName = 'Footer'
