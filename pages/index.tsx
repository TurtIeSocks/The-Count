import * as React from 'react'
import Grid2 from '@mui/material/Unstable_Grid2'

import { Search } from '@components/Search'

const Home = () => {
  return (
    <Grid2 container px={4} mb={12}>
      <Search />
    </Grid2>
  )
}

export default Home
