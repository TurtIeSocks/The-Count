import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid2 from '@mui/material/Unstable_Grid2'
import { useRouter } from 'next/router'

export function Header() {
  const router = useRouter()
  const home = router.pathname === '/'
  return (
    <Box component="header" px={4}>
      <Typography
        color="secondary"
        variant="h2"
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
