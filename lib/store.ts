import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Filters, Pokedex } from './types'
import { DEFAULT_FILTERS } from './constants'

interface UseStorage {
  darkMode: boolean | null
  filters: Filters
  advExpanded: boolean
  loading: boolean
  error: Error | null
  ready: boolean
  pokedex: Pokedex
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
      pokedex: [],
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
  if (!pokedex) return
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
    pokedex,
    ready: true,
  }))
}
