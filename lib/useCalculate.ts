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
  const pokedex = useStorage((s) => s.pokedex)
  const ready = useStorage((s) => s.ready)
  const [matches, setMatches] = useState<Match[]>([])
  const [count, setCount] = useState(0)
  const [time, setTime] = useState(0)

  const relevantCPM = useMemo(
    () =>
      Object.entries(CPM).filter(([lvl, _]) => {
        const level = +lvl
        return level >= filters.level[0] && level <= filters.level[1]
      }),
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
    const pokedexFiltered = pokedex.filter((pokemon) => {
      if (pokemon.legendary && !filters.legends) return false
      if (pokemon.mythical && !filters.mythics) return false
      if (pokemon.unreleased && !filters.unreleased) return false
      if (pokemon.ultraBeast && !filters.ultraBeasts) return false
      if (pokemon.form && !filters.forms) return false
      if (pokemon.mega && !filters.megas) return false
      if (!filters.generations[pokemon.generation]) return false
      if (pokemon.types.some((type) => filters.types[type])) return true
      return false
    })
    return chunkArray(pokedexFiltered, workers.length)
  }, [filters, pokedex, workers.length])

  useEffect(() => {
    if (ready && filters.cp > 10) {
      const time = Date.now()
      useStorage.setState({ loading: true })
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
      } finally {
        useStorage.setState({ loading: false })
      }
    }
  }, [filters, relevantCPM, chunks, workers, ready])

  return { matches, count, time, cp: filters.cp }
}
