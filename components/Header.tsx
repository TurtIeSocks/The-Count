import * as React from 'react'
import { usePathname } from 'next/navigation'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { Theme, useMediaQuery } from '@mui/material'

export const Header = () => {
  const pathname = usePathname()
  const home = pathname === '/'
  const isMobile = useMediaQuery<Theme>((t) => t.breakpoints.only('xs'))

  return (
    <Box component="header" px={4}>
      <Typography
        color="secondary"
        variant={home && !isMobile ? 'h1' : 'h2'}
        fontWeight="bold"
        pt={home ? 16 : 0}
      >
        The Count
      </Typography>
      {home && (
        <Grid container>
          <Typography variant="h6" maxWidth={400}>
            Calculator for Pokemon GO communities that play the popular game
            &quot;The Count&quot;{' '}
          </Typography>
        </Grid>
      )}
    </Box>
  )
}
