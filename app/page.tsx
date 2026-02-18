import { Suspense } from 'react'
import Grid from '@mui/material/Grid'

import { Search } from '@components/Search'

const HomePage = () => {
  return (
    <Grid component="main" container px={4} mb={12}>
      <Suspense fallback={null}>
        <Search />
      </Suspense>
    </Grid>
  )
}

export default HomePage
