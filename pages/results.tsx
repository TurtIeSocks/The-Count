import * as React from 'react'
import Grid2 from '@mui/material/Unstable_Grid2'

import { setPokedex } from '@lib/store'
import { getMasterfile } from '@lib/masterfile'
import { Pokedex } from '@lib/types'
import { useStateManager } from '@lib/useStateManager'

import { AdvancedSearch } from '@components/AdvSearch'
import { ResultTable } from '@components/Table'

export const getStaticProps = async () => {
  const data = await getMasterfile()
  return {
    props: { pokedex: JSON.parse(JSON.stringify(data)) },
  }
}

const ResultsPage = ({ pokedex }: { pokedex: Pokedex }) => {
  useStateManager()
  React.useEffect(() => setPokedex(pokedex), [pokedex])
  return (
    <Grid2 container overflow="auto">
      <AdvancedSearch />
      <ResultTable />
    </Grid2>
  )
}

export default ResultsPage
