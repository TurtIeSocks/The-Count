/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */

import pokedex from '@data/pokedex.json'
import cpms from '@data/cpm.json'

const buildData = (
  selectedCP, minAtk, maxAtk, minDef, maxDef, minSta, maxSta, minLevel, maxLevel,
  minIv, maxIv, gens, types, forms, megas, legends, mythics,
) => {
  const matches = []

  if (selectedCP < 10) {
    return matches
  }
  const cpCalc = (atk, def, sta, cpm) => {
    const cp = Math.floor((atk * def ** 0.5 * sta ** 0.5 * cpm ** 2) / 10)
    return cp < 10 ? 10 : cp
  }

  const getMatches = (i, pokemon) => {
    const localMatches = []
    if (gens[pokemon.generation] && (types[pokemon.types[0]] || types[pokemon.types[1]])) {
      for (const [level, cpm] of Object.entries(cpms)) {
        if (level >= minLevel && level <= maxLevel) {
          const minCp = cpCalc(pokemon.attack + minAtk, pokemon.defense + minDef, pokemon.stamina + minSta, cpm)
          if (minCp > selectedCP) {
            continue
          }
          const maxCp = cpCalc(pokemon.attack + maxAtk, pokemon.defense + maxDef, pokemon.stamina + maxSta, cpm)
          if (maxCp < selectedCP) {
            continue
          }
          for (let a = minAtk; a <= maxAtk; a += 1) {
            const attack = pokemon.attack + a
            for (let d = minDef; d <= maxDef; d += 1) {
              const defense = pokemon.defense + d
              for (let s = minSta; s <= maxSta; s += 1) {
                const stamina = pokemon.stamina + s
                const iv = Math.floor(((a + d + s) / 45) * 100)
                if (iv >= minIv && iv <= maxIv) {
                  if (cpCalc(attack, defense, stamina, cpm) === selectedCP) {
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
      }
    }
    return localMatches
  }

  for (const [i, pokemon] of Object.entries(pokedex)) {
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
