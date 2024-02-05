import { useEffect } from 'react'

import { useStorage } from '@lib/store'
import { arrayCompare, getIv, validateIv } from './utils'

export const useStateManager = () => {
  useEffect(() => {
    const sub = useStorage.subscribe((next, prev) => {
      if (
        prev.pokedex !== next.pokedex ||
        prev.filters.legends !== next.filters.legends ||
        prev.filters.mythics !== next.filters.mythics ||
        prev.filters.unreleased !== next.filters.unreleased ||
        prev.filters.ultraBeasts !== next.filters.ultraBeasts ||
        prev.filters.forms !== next.filters.forms ||
        prev.filters.megas !== next.filters.megas ||
        prev.filters.types !== next.filters.types ||
        prev.filters.generations !== next.filters.generations
      ) {
        return useStorage.setState({
          pokemonSelection: next.pokedex.filter((pokemon) => {
            if (pokemon.legendary && !next.filters.legends) return false
            if (pokemon.mythical && !next.filters.mythics) return false
            if (pokemon.unreleased && !next.filters.unreleased) return false
            if (pokemon.ultraBeast && !next.filters.ultraBeasts) return false
            if (pokemon.form && !next.filters.forms) return false
            if (pokemon.mega && !next.filters.megas) return false
            if (!next.filters.generations[pokemon.generation]) return false
            if (pokemon.types.some((type) => next.filters.types[type]))
              return true
            return false
          }),
        })
      }
      if (
        prev.pokemonSelection !== next.pokemonSelection ||
        prev.selected !== next.selected
      ) {
        return useStorage.setState({
          filteredDex: next.selected.length
            ? next.pokemonSelection.filter((mon) => next.selected.includes(mon))
            : next.pokemonSelection,
        })
      }
      if (
        !arrayCompare(prev.filters.atk, next.filters.atk) ||
        !arrayCompare(prev.filters.def, next.filters.def) ||
        !arrayCompare(prev.filters.sta, next.filters.sta)
      ) {
        return useStorage.setState({
          filters: {
            ...next.filters,
            iv: [
              getIv(
                next.filters.atk[0],
                next.filters.def[0],
                next.filters.sta[0],
              ),
              getIv(
                next.filters.atk[1],
                next.filters.def[1],
                next.filters.sta[1],
              ),
            ],
          },
        })
      } else if (!arrayCompare(prev.filters.iv, next.filters.iv)) {
        const minAllowedPoints = Math.round((next.filters.iv[0] / 100) * 45)
        const maxAllowedPoints = Math.round((next.filters.iv[1] / 100) * 45)
        const prevMinTotal =
          next.filters.atk[0] + next.filters.def[0] + next.filters.sta[0]
        const prevMaxTotal =
          next.filters.atk[1] + next.filters.def[1] + next.filters.sta[1]

        const minAtkRatio = next.filters.atk[0] / (prevMinTotal || 1)
        const maxAtkRatio = next.filters.atk[1] / (prevMaxTotal || 1)
        const minDefRatio = next.filters.def[0] / (prevMinTotal || 1)
        const maxDefRatio = next.filters.def[1] / (prevMaxTotal || 1)
        const minStaRatio = next.filters.sta[0] / (prevMinTotal || 1)
        const maxStaRatio = next.filters.sta[1] / (prevMaxTotal || 1)

        let minAtkPoints = validateIv(Math.ceil(minAllowedPoints * minAtkRatio))
        let maxAtkPoints = validateIv(
          Math.floor(maxAllowedPoints * maxAtkRatio),
        )
        let minDefPoints = validateIv(Math.ceil(minAllowedPoints * minDefRatio))
        let maxDefPoints = validateIv(
          Math.floor(maxAllowedPoints * maxDefRatio),
        )
        let minStaPoints = validateIv(Math.ceil(minAllowedPoints * minStaRatio))
        let maxStaPoints = validateIv(
          Math.floor(maxAllowedPoints * maxStaRatio),
        )
        let currentMaxTotal = maxAtkPoints + maxDefPoints + maxStaPoints
        while (currentMaxTotal < maxAllowedPoints) {
          if (maxAtkPoints < 15) {
            maxAtkPoints++
            currentMaxTotal++
          }
          if (maxDefPoints < 15 && currentMaxTotal < maxAllowedPoints) {
            maxDefPoints++
            currentMaxTotal++
          }
          if (maxStaPoints < 15 && currentMaxTotal < maxAllowedPoints) {
            maxStaPoints++
            currentMaxTotal++
          }
        }
        let currentMinTotal = minAtkPoints + minDefPoints + minStaPoints
        while (currentMinTotal !== minAllowedPoints) {
          if (currentMinTotal < minAllowedPoints && minAtkPoints < 15) {
            minAtkPoints++
            currentMinTotal++
          } else if (currentMinTotal > minAllowedPoints && minAtkPoints > 0) {
            minAtkPoints--
            currentMinTotal--
          }
          if (currentMinTotal < minAllowedPoints && minDefPoints < 15) {
            minDefPoints++
            currentMinTotal++
          } else if (currentMinTotal > minAllowedPoints && minDefPoints > 0) {
            minDefPoints--
            currentMinTotal--
          }
          if (currentMinTotal < minAllowedPoints && minStaPoints < 15) {
            minStaPoints++
            currentMinTotal++
          } else if (currentMinTotal > minAllowedPoints && minStaPoints > 0) {
            minStaPoints--
            currentMinTotal--
          }
        }
        return useStorage.setState({
          filters: {
            ...next.filters,
            atk: [validateIv(minAtkPoints), validateIv(maxAtkPoints)],
            def: [validateIv(minDefPoints), validateIv(maxDefPoints)],
            sta: [validateIv(minStaPoints), validateIv(maxStaPoints)],
          },
        })
      }
    })
    return () => sub()
  }, [])
}
