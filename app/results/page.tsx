import AdvancedSearch from '@components/AdvSearch'
import ResultTable from '@components/Table'
import { getMasterfile } from '@lib/masterfile'
import Grid2 from '@mui/material/Unstable_Grid2'
import React from 'react'

export default async function ResultsPage() {
  const pokedex = await getMasterfile()
  return (
    <React.Suspense>
      <Grid2 container overflow="hidden">
        <AdvancedSearch />
        <ResultTable pokedex={pokedex} />
      </Grid2>
    </React.Suspense>
  )
}
