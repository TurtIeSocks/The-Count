import type { Filters, Match, Pokemon } from '@lib/types'

function cpCalc(atk: number, def: number, sta: number, cpm: number) {
  const cp = Math.floor((atk * def ** 0.5 * sta ** 0.5 * cpm ** 2) / 10)
  return cp < 10 ? 10 : cp
}

export function buildData(
  {
    cp,
    atk: [minAtk, maxAtk],
    def: [minDef, maxDef],
    sta: [minSta, maxSta],
  }: Filters,
  relevantCPM: [number, number][],
  pokemon: Pokemon,
  matches: Match[],
) {
  let count = 0
  for (let i = 0; i < relevantCPM.length; i++) {
    const [level, cpm] = relevantCPM[i]
    const minCp = cpCalc(
      pokemon.attack + minAtk,
      pokemon.defense + minDef,
      pokemon.stamina + minSta,
      cpm,
    )
    if (minCp > cp) {
      count +=
        (maxAtk - minAtk + 1) * (maxDef - minDef + 1) * (maxSta - minSta + 1)
      continue
    }
    const maxCp = cpCalc(
      pokemon.attack + maxAtk,
      pokemon.defense + maxDef,
      pokemon.stamina + maxSta,
      cpm,
    )
    if (maxCp < cp) {
      count +=
        (maxAtk - minAtk + 1) * (maxDef - minDef + 1) * (maxSta - minSta + 1)
      continue
    }
    for (let atk = minAtk; atk <= maxAtk; atk++) {
      for (let def = minDef; def <= maxDef; def++) {
        for (let sta = minSta; sta <= maxSta; sta++) {
          count++
          const currentCp = cpCalc(
            pokemon.attack + atk,
            pokemon.defense + def,
            pokemon.stamina + sta,
            cpm,
          )
          if (currentCp === cp) {
            matches.push({
              name: pokemon.name,
              atk,
              def,
              sta,
              level,
            })
          }
        }
      }
    }
  }
  return count
}
