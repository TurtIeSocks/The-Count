import { getMasterfile } from '@lib/masterfile'

import { ResultsPageClient } from './results-page-client'

export const revalidate = 86400

const ResultsPage = async () => {
  const pokedex = await getMasterfile()
  return <ResultsPageClient pokedex={pokedex} />
}

export default ResultsPage
