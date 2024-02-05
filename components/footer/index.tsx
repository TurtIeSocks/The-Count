import * as React from 'react'
import dynamic from 'next/dynamic'
import Box from '@mui/material/Box'

import styles from '../../styles.module.css'
import { HelpBtn, HelpDialog } from './Help'
import { GitHubLink } from './GitHub'
import { HomeLink } from './Home'
import { ShareAlert, ShareLink } from './Share'

const DynThemeToggle = dynamic(
  () =>
    import('@components/footer/ThemeToggle').then((comp) => comp.ThemeToggle),
  {
    ssr: false,
  },
)

export const Footer = React.memo(
  () => {
    return (
      <Box component="footer" className={styles.footer}>
        <HomeLink />
        <ShareLink />
        <ShareAlert />
        <HelpBtn />
        <HelpDialog />
        <DynThemeToggle />
        <GitHubLink />
      </Box>
    )
  },
  () => true,
)

Footer.displayName = 'Footer'
