import { useEffect, useMemo, useState } from 'react'
import { CPM } from '../assets/constants'
import { useStorage } from './store'
import { Match } from '../assets/types'

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
  const pokedex = useStorage((state) => state.pokedex)

  const [matches, setMatches] = useState<Match[]>([])

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
        .map(() => new Worker('/worker.js'))
    }
    return []
  }, [])

  const chunks = useMemo(
    () => chunkArray(pokedex, workers.length),
    [pokedex, workers.length],
  )

  useEffect(() => {
    console.time('Total time')
    useStorage.setState({ loading: true })
    try {
      const promises = chunks.map((chunk, i) => {
        const worker = workers[i]
        return new Promise((resolve, reject) => {
          worker.postMessage({ filters, chunk, relevantCPM })
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
  }, [filters, relevantCPM, pokedex])

  return matches
}
