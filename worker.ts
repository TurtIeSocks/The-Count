import type { Match } from '@lib/types'
import { buildData } from '@lib/buildData'

addEventListener('message', ({ data: { chunk, filters, relevantCPM } }) => {
  let results: Match[] = []
  let count = 0
  for (let i = 0; i < chunk.length; i++) {
    count += buildData(filters, relevantCPM, chunk[i], results)
  }
  postMessage({ results, count })
})
