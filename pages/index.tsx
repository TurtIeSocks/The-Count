import * as React from 'react'
import Search from '@components/Search'
import Grid2 from '@mui/material/Unstable_Grid2'

export default function Home() {
  return (
    <Grid2 container px={4} mb={12}>
      <Search />
    </Grid2>
  )
}
