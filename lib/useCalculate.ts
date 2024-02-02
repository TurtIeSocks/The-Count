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

export function useCalculate() {
  const filters = useStorage((state) => state.filters)
  const pokedex = useStorage((s) => s.filteredDex)
  const ready = useStorage((s) => s.ready)
  const [matches, setMatches] = useState<Match[]>([])
  const [count, setCount] = useState(0)
  const [time, setTime] = useState(0)

  const relevantCPM = useMemo(
    () =>
      Object.entries(CPM)
        .filter(([lvl, _]) => {
          const level = +lvl
          return level >= filters.level[0] && level <= filters.level[1]
        })
        .map(([level, cpm]) => [+level, cpm] as [number, number])
        .sort(([a], [b]) => a - b),
    [filters.level],
  )

  const workers = useMemo(
    () =>
      typeof Worker !== 'undefined'
        ? new Array(navigator.hardwareConcurrency || 4)
            .fill(0)
            .map(() => new Worker(new URL('../worker.ts', import.meta.url)))
        : [],
    [],
  )

  const chunks = useMemo(() => {
    return chunkArray(pokedex, workers.length)
  }, [pokedex, workers])

  useEffect(() => {
    if (ready && filters.cp > 10 && pokedex.length > 0 && workers.length > 0) {
      const time = Date.now()
      try {
        const ivF = { ...filters, iv: filters.iv.map((iv) => iv / 100) }
        const promises = chunks.map((chunk, i) => {
          const worker = workers[i]
          return new Promise((resolve, reject) => {
            worker.postMessage({ filters: ivF, chunk, relevantCPM })
            worker.onmessage = (e) => resolve(e.data)
            worker.onerror = (e) => reject(e)
          }) as Promise<{ results: Match[]; count: number }>
        })
        Promise.all(promises).then((allResults) => {
          let totalCount = 0
          const matches: Match[][] = Array(allResults.length)
          allResults.forEach((result) => {
            totalCount += result.count
            matches.push(result.results)
          })
          setMatches(matches.flat())
          setCount(totalCount)
          setTime(Date.now() - time)
        })
      } catch (e) {
        console.error(e)
      }
    }
  }, [filters, relevantCPM, chunks, workers, ready, pokedex])

  return { matches, count, time, cp: filters.cp }
}
