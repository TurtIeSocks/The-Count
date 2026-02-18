import type { Match, WorkerRequest, WorkerResponse } from '@lib/types'
import { buildData } from '@lib/buildData'

self.addEventListener('message', (event: MessageEvent<WorkerRequest>) => {
  const { jobId, chunk, filters, relevantCPM } = event.data
  const results: Match[] = []
  let count = 0
  for (let i = 0; i < chunk.length; i++) {
    count += buildData(filters, relevantCPM, chunk[i], results)
  }
  const response: WorkerResponse = { jobId, results, count }
  self.postMessage(response)
})
