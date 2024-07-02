import { useEffect, useMemo, useState } from 'react'

import { CPM } from './constants'
import { useStorage } from './store'
import { Match } from './types'
import { chunkArray } from './utils'

export const useCalculate = () => {
  const levels = useStorage((s) => s.filters.level)
  const pokedex = useStorage((s) => s.filteredDex)
  const ready = useStorage((s) => s.ready)
  const cp = useStorage((s) => s.filters.cp)
  const iv = useStorage((s) => s.filters.iv)
  const atk = useStorage((s) => s.filters.atk)
  const def = useStorage((s) => s.filters.def)
  const sta = useStorage((s) => s.filters.sta)
  const [matches, setMatches] = useState<Match[]>([])
  const [count, setCount] = useState(0)
  const [time, setTime] = useState(0)

  const relevantCPM = useMemo(() => {
    return Object.entries(CPM)
      .filter(([lvl, _]) => {
        const level = +lvl
        return level >= levels[0] && level <= levels[1]
      })
      .map(([level, cpm]) => [+level, cpm] as [number, number])
      .sort(([a], [b]) => a - b)
  }, [levels])

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
    if (ready && cp > 10 && pokedex.length > 0 && workers.length > 0) {
      const { filters } = useStorage.getState()
      const time = Date.now()
      try {
        const promises = chunks.map((chunk, i) => {
          const worker = workers[i]
          return new Promise((resolve, reject) => {
            worker.postMessage({ filters, chunk, relevantCPM })
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
          const flattened = matches.flat()
          setMatches(flattened)
          setCount(totalCount)
          setTime(Date.now() - time)
          useStorage.setState({ matchCount: flattened.length })
        })
      } catch (e) {
        console.error(e)
      }
    }
  }, [
    relevantCPM,
    chunks,
    workers,
    ready,
    pokedex,
    cp,
    iv,
    atk,
    def,
    sta,
    levels,
  ])

  return { matches, count, time }
}
