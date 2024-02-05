import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import { Filters, Pokedex } from './types'
import { DEFAULT_FILTERS } from './constants'

interface UseStorage {
  filters: Filters
  advExpanded: boolean
  helpDialog: boolean
  loading: boolean
  error: Error | null
  ready: boolean
  pokedex: Pokedex
  filteredDex: Pokedex
  pokemonSelection: Pokedex
  selected: Pokedex
}

export const useStorage = create<UseStorage>()(
  persist(
    (set, get) => ({
      filters: DEFAULT_FILTERS,
      advExpanded: false,
      helpDialog: false,
      loading: false,
      error: null,
      ready: false,
      selected: [],
      pokedex: [],
      pokemonSelection: [],
      filteredDex: [],
    }),
    {
      name: 'local-state',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        filters: { ...state.filters, cp: 0 },
        advExpanded: state.advExpanded,
        selected: state.selected,
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

  useStorage.setState((prev) => {
    const exitingSelected = new Set(prev.selected.map((mon) => mon.name))
    return {
      filters: {
        ...DEFAULT_FILTERS,
        ...prev.filters,
        generations: {
          ...generations,
          ...prev.filters.generations,
        },
        types: {
          ...DEFAULT_FILTERS.types,
          ...prev.filters.types,
        },
      },
      pokedex,
      selected: pokedex.filter((mon) => exitingSelected.has(mon.name)),
      ready: true,
    }
  })
}
