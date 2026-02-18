'use client'

import * as React from 'react'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'

import { setPokedex } from '@lib/store'
import { Pokedex } from '@lib/types'
import { useStateManager } from '@lib/useStateManager'

import { AdvancedSearch } from '@components/AdvSearch'
import { ResultTable } from '@components/Table'

export const ResultsPageClient = ({ pokedex }: { pokedex: Pokedex }) => {
  useStateManager()

  React.useEffect(() => {
    if (pokedex.length > 0) {
      setPokedex(pokedex)
    }
  }, [pokedex])

  if (!pokedex.length) {
    return (
      <Grid container px={2} py={4}>
        <Alert severity="warning">
          Pokemon data is temporarily unavailable. Please try again later.
        </Alert>
      </Grid>
    )
  }

  return (
    <Grid container overflow="auto">
      <AdvancedSearch />
      <ResultTable />
    </Grid>
  )
}
