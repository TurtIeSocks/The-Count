/* eslint-disable no-continue */
/* eslint-disable max-len */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-labels */
/* eslint-disable nonblock-statement-body-position */
/* eslint-disable no-labels */
/* eslint-disable no-restricted-syntax */

import pokedex from '../data/pokedex.json'
import cpCalc from './cpCalculator'
import cpm from '../data/cpm.json'

const buildData = (
  selectedCP, minAtk, maxAtk, minDef, maxDef, minSta, maxSta, minLevel, maxLevel, minIv, maxIv, gens, types, forms, megas, legends, mythics,
) => {
  const matches = []

  if (selectedCP < 10) {
    return matches
  }

  const getMatches = (i, pokemon) => {
    const localMatches = []
    if (matches.length <= 50000 && localMatches.length <= 50000) {
      if (gens[pokemon.generation] && (types[pokemon.types[0]] || types[pokemon.types[1]])) {
        // eslint-disable-next-line max-len
        const maxCp = cpCalc(pokemon.attack + maxAtk, pokemon.defense + maxDef, pokemon.stamina + maxSta, maxLevel, minIv)
        if (maxCp >= selectedCP) {
          level: Object.keys(cpm).forEach(level => {
            if (level >= minLevel && level <= maxLevel) {
              atk: for (let a = minAtk; a <= maxAtk; a++) {
                def: for (let d = minDef; d <= maxDef; d++) {
                  sta: for (let s = minSta; s <= maxSta; s++) {
                    const iv = Math.floor(((a + d + s) / 45) * 100)
                    if (iv >= minIv && iv <= maxIv) {
                      const cp = cpCalc(pokemon.attack + a, pokemon.defense + d, pokemon.stamina + s, level)
                      if (cp === selectedCP) {
                        localMatches.push(
                          {
                            num: i,
                            name: pokemon.name,
                            atk: a,
                            def: d,
                            sta: s,
                            level,
                            iv,
                          },
                        )
                      }
                    }
                  }
                }
              }
            }
          })
        }
      }
    }
    return localMatches
  }
  pokemon: for (const [i, pokemon] of Object.entries(pokedex)) {
    if (pokemon.legendary && !legends) {
      continue
    }
    if (pokemon.mythical && !mythics) {
      continue
    }
    matches.push(...getMatches(i, pokemon))
    if (pokemon.forms && forms) {
      pokemon.forms.forEach((form, index) => {
        pokemon.forms[index].generation = pokemon.generation
        if (!form.types) {
          pokemon.forms[index].types = pokemon.types
        }
        matches.push(...getMatches(i, form))
      })
    }
    if (pokemon.megas && megas) {
      pokemon.megas.forEach((mega, index) => {
        pokemon.megas[index].generation = pokemon.generation
        if (!mega.types) {
          pokemon.megas[index].types = pokemon.types
        }
        matches.push(...getMatches(i, mega))
      })
    }
  }
  return matches
}

export default buildData
