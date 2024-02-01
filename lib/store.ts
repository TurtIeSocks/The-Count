import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Filters, Pokedex } from '../assets/types'
import { DEFAULT_FILTERS } from '../assets/constants'

interface UseStorage {
  darkMode: boolean | null
  filters: Filters
  pokedex: Pokedex
  advExpanded: boolean
  loading: boolean
  error: Error | null
}

export const useStorage = create<UseStorage>()(
  persist(
    () =>
      ({
        darkMode: null,
        filters: DEFAULT_FILTERS,
        pokedex: [],
        advExpanded: false,
        loading: false,
        error: null,
      } as UseStorage),
    {
      name: 'local-state',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        darkMode: state.darkMode,
        filters: { ...state.filters, cp: 0 },
      }),
    },
  ),
)

export const setPokedex = (pokedex: Pokedex) => {
  const generations = pokedex.reduce((acc, mon) => {
    acc[mon.generation] = true
    return acc
  }, {} as Record<string, boolean>)

  useStorage.setState((prev) => ({
    pokedex,
    filters: {
      ...prev.filters,
      generations,
    },
    darkMode:
      prev.darkMode ??
      !!window?.matchMedia('(prefers-color-scheme: dark)').matches,
  }))
}
