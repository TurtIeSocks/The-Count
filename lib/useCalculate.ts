'use client'

import { useEffect, useMemo, useState } from 'react'
import { CPM } from './constants'
import { setPokedex, useStorage } from './store'
import { Match, Pokedex } from './types'

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

export function useCalculate(pokedex: Pokedex, cp: number) {
  const filters = useStorage((state) => state.filters)
  const [matches, setMatches] = useState<Match[]>([])
  const ready = useStorage((state) => state.ready)

  const relevantCPM = useMemo(
    () =>
      Object.entries(CPM).filter(([lvl, _]) => {
        const level = +lvl
        return level >= filters.level[0] && level <= filters.level[1]
      }),
    [filters.level],
  )

  const workers = useMemo(() => {
    if (typeof Worker !== 'undefined') {
      return new Array(navigator.hardwareConcurrency || 4)
        .fill(0)
        .map(() => new Worker(new URL('../worker.ts', import.meta.url)))
    }
    return []
  }, [])

  const chunks = useMemo(
    () => chunkArray(pokedex, workers.length),
    [pokedex, workers.length],
  )

  useEffect(() => {
    if (ready) {
      console.time('Total time')
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
    } else {
      setPokedex(pokedex)
    }
  }, [filters, cp, relevantCPM, pokedex, chunks, workers, ready])

  return matches
}
