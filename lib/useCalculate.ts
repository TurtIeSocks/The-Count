import { useEffect, useMemo, useState } from 'react'
import { CPM } from './constants'
import { useStorage } from './store'
import { Match } from './types'

function chunkArray<T>(array: T[], numberOfChunks: number): T[][] {
  const chunks = []
  const chunkSize = Math.ceil(array.length / numberOfChunks)

  for (let i = 0; i < numberOfChunks; i++) {
    const start = i * chunkSize
    const end = start + chunkSize
    chunks.push(array.slice(start, end))
  }

  return chunks
}

export function useCalculate(cp: number) {
  const filters = useStorage((state) => state.filters)
  const pokedex = useStorage((s) => s.pokedex)
  const ready = useStorage((s) => s.ready)
  const [matches, setMatches] = useState<Match[]>([])

  const relevantCPM = useMemo(
    () =>
      Object.entries(CPM).filter(([lvl, _]) => {
        const level = +lvl
        return level >= filters.level[0] && level <= filters.level[1]
      }),
    [filters.level],
  )

  const { workers, chunks } = useMemo(() => {
    const localWorkers =
      typeof Worker !== 'undefined'
        ? new Array(navigator.hardwareConcurrency || 4)
            .fill(0)
            .map(() => new Worker(new URL('../worker.ts', import.meta.url)))
        : []
    return {
      workers: localWorkers,
      chunks: chunkArray(pokedex, localWorkers.length),
    }
  }, [pokedex])

  useEffect(() => {
    console.time('Total time')
    if (ready && pokedex.length > 0 && cp > 10) {
      const withCp = { ...filters, cp }
      useStorage.setState({ loading: true })
      try {
        const promises = chunks.map((chunk, i) => {
          const worker = workers[i]
          return new Promise((resolve, reject) => {
            worker.postMessage({ filters: withCp, chunk, relevantCPM })
            worker.onmessage = (e) => resolve(e.data)
            worker.onerror = (e) => reject(e)
          }) as Promise<Match[]>
        })
        Promise.all(promises).then((allResults) => {
          console.timeEnd('Total time')
          setMatches(allResults.flat())
        })
      } catch (e) {
        console.error(e)
      } finally {
        useStorage.setState({ loading: false })
      }
    }
  }, [filters, cp, relevantCPM, pokedex, chunks, workers, ready])

  return matches
}
