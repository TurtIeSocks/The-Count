'use client'

import * as React from 'react'
import Grid from '@mui/material/Grid'

import { Search } from '@components/Search'

const HomePage = () => {
  return (
    <Grid container px={4} mb={12}>
      <React.Suspense fallback={null}>
        <Search />
      </React.Suspense>
    </Grid>
  )
}

export default HomePage
