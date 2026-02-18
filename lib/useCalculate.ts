import { useEffect, useMemo, useRef, useState } from 'react'

import { buildData } from './buildData'
import { CPM } from './constants'
import { useStorage } from './store'
import {
  CalculationFilters,
  Match,
  PokemonStats,
  WorkerRequest,
  WorkerResponse,
} from './types'
import { chunkArray } from './utils'

const MIN_CP = 10
const MAX_WORKERS = 8

const runMainThreadCalculation = (
  filters: CalculationFilters,
  relevantCPM: [number, number][],
  pokedex: PokemonStats[],
) => {
  const results: Match[] = []
  let count = 0
  for (let i = 0; i < pokedex.length; i++) {
    count += buildData(filters, relevantCPM, pokedex[i], results)
  }
  return { results, count }
}

const runWorkerJob = (
  worker: Worker,
  payload: WorkerRequest,
  signal: AbortSignal,
) =>
  new Promise<WorkerResponse>((resolve, reject) => {
    if (signal.aborted) {
      reject(new DOMException('Calculation aborted', 'AbortError'))
      return
    }

    const cleanup = () => {
      worker.removeEventListener('message', onMessage)
      worker.removeEventListener('error', onError)
      signal.removeEventListener('abort', onAbort)
    }

    const onMessage = (event: MessageEvent<WorkerResponse>) => {
      if (!event.data || event.data.jobId !== payload.jobId) return
      cleanup()
      resolve(event.data)
    }

    const onError = (event: ErrorEvent) => {
      cleanup()
      reject(event.error ?? new Error(event.message))
    }

    const onAbort = () => {
      cleanup()
      reject(new DOMException('Calculation aborted', 'AbortError'))
    }

    worker.addEventListener('message', onMessage)
    worker.addEventListener('error', onError)
    signal.addEventListener('abort', onAbort, { once: true })
    worker.postMessage(payload)
  })

export const useCalculate = () => {
  const levels = useStorage((s) => s.filters.level)
  const pokedex = useStorage((s) => s.filteredDex)
  const ready = useStorage((s) => s.ready)
  const cp = useStorage((s) => s.filters.cp)
  const atk = useStorage((s) => s.filters.atk)
  const def = useStorage((s) => s.filters.def)
  const sta = useStorage((s) => s.filters.sta)
  const [matches, setMatches] = useState<Match[]>([])
  const [count, setCount] = useState(0)
  const [time, setTime] = useState(0)
  const workersRef = useRef<Worker[]>([])
  const requestIdRef = useRef(0)

  const relevantCPM = useMemo(() => {
    return Object.entries(CPM)
      .filter(([lvl]) => {
        const level = +lvl
        return level >= levels[0] && level <= levels[1]
      })
      .map(([level, cpm]) => [+level, cpm] as [number, number])
      .sort(([a], [b]) => a - b)
  }, [levels])

  const workerPokedex = useMemo<PokemonStats[]>(
    () =>
      pokedex.map(({ name, attack, defense, stamina }) => ({
        name,
        attack,
        defense,
        stamina,
      })),
    [pokedex],
  )

  const filters = useMemo<CalculationFilters>(
    () => ({
      cp,
      atk: [atk[0], atk[1]],
      def: [def[0], def[1]],
      sta: [sta[0], sta[1]],
    }),
    [cp, atk, def, sta],
  )

  useEffect(() => {
    if (typeof Worker === 'undefined') return
    const hardwareConcurrency =
      typeof navigator === 'undefined' ? 4 : navigator.hardwareConcurrency || 4
    const workerCount = Math.max(
      1,
      Math.min(hardwareConcurrency, MAX_WORKERS),
    )
    workersRef.current = Array.from(
      { length: workerCount },
      () => new Worker(new URL('../worker.ts', import.meta.url)),
    )
    return () => {
      workersRef.current.forEach((worker) => worker.terminate())
      workersRef.current = []
    }
  }, [])

  useEffect(() => {
    if (!ready || filters.cp < MIN_CP || workerPokedex.length === 0) {
      setMatches([])
      setCount(0)
      setTime(0)
      useStorage.setState({ matchCount: 0 })
      return
    }

    const jobId = ++requestIdRef.current
    const startedAt = performance.now()
    const controller = new AbortController()

    const applyResult = (nextMatches: Match[], nextCount: number) => {
      if (controller.signal.aborted || jobId !== requestIdRef.current) return
      setMatches(nextMatches)
      setCount(nextCount)
      setTime(Math.round(performance.now() - startedAt))
      useStorage.setState({ matchCount: nextMatches.length })
    }

    const runCalculation = async () => {
      try {
        if (workersRef.current.length === 0) {
          const fallbackResult = runMainThreadCalculation(
            filters,
            relevantCPM,
            workerPokedex,
          )
          applyResult(fallbackResult.results, fallbackResult.count)
          return
        }

        const workerCount = Math.min(workersRef.current.length, workerPokedex.length)
        const chunks = chunkArray(workerPokedex, workerCount)
        const responses = await Promise.all(
          chunks.map((chunk, index) =>
            runWorkerJob(
              workersRef.current[index],
              { jobId, chunk, filters, relevantCPM },
              controller.signal,
            ),
          ),
        )

        let totalCount = 0
        const flattened: Match[] = []
        for (let i = 0; i < responses.length; i++) {
          totalCount += responses[i].count
          flattened.push(...responses[i].results)
        }

        applyResult(flattened, totalCount)
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return
        console.error('Worker calculation failed, falling back to main thread.', error)
        const fallbackResult = runMainThreadCalculation(
          filters,
          relevantCPM,
          workerPokedex,
        )
        applyResult(fallbackResult.results, fallbackResult.count)
      }
    }

    void runCalculation()

    return () => {
      controller.abort()
    }
  }, [ready, filters, relevantCPM, workerPokedex])

  return { matches, count, time }
}
