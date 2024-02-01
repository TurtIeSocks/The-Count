import * as React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Search from '@components/Search'
import { getMasterfile } from '@lib/masterfile'
import { Pokedex } from '@lib/types'

export default function Home({ pokedex }: { pokedex: Pokedex }) {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      overflow="hidden"
    >
      <Box maxWidth={400} px={2} mb={6}>
        <Typography variant="h6" align="center" pb={2} gutterBottom>
          Calculator for Pokemon GO communities that play the popular game
          &quot;The Count&quot;{' '}
        </Typography>
        <React.Suspense>
          <Search />
        </React.Suspense>
      </Box>
    </Box>
  )
}
