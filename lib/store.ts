import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Filters, Pokedex } from './types'
import { DEFAULT_FILTERS } from './constants'
import { getMasterfile } from './masterfile'

interface UseStorage {
  darkMode: boolean | null
  filters: Filters
  advExpanded: boolean
  loading: boolean
  error: Error | null
  ready: boolean
}

export const useStorage = create<UseStorage>()(
  persist(
    (set, get) => ({
      darkMode: null,
      filters: DEFAULT_FILTERS,
      advExpanded: false,
      loading: false,
      error: null,
      ready: false,
    }),
    {
      name: 'local-state',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        darkMode: state.darkMode,
        filters: { ...state.filters, cp: 0 },
        advExpanded: state.advExpanded,
      }),
    },
  ),
)

export const setPokedex = (pokedex: Pokedex) => {
  const generations = pokedex.reduce(
    (acc, mon) => {
      acc[mon.generation] = true
      return acc
    },
    {} as Record<string, boolean>,
  )

  useStorage.setState((prev) => ({
    filters: {
      ...prev.filters,
      generations: {
        ...generations,
        ...prev.filters.generations,
      },
    },
    ready: true,
    darkMode:
      prev.darkMode ??
      !!window?.matchMedia('(prefers-color-scheme: dark)').matches,
  }))
}
