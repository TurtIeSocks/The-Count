import * as React from 'react'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid2 from '@mui/material/Unstable_Grid2'
import { Theme, useMediaQuery } from '@mui/material'

export const Header = () => {
  const router = useRouter()
  const home = router.pathname === '/'
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
        <Grid2 container>
          <Typography variant="h6" maxWidth={400}>
            Calculator for Pokemon GO communities that play the popular game
            &quot;The Count&quot;{' '}
          </Typography>
        </Grid2>
      )}
    </Box>
  )
}
