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
    iv: [minIv, maxIv],
  }: Filters,
  relevantCPM: [number, number][],
  pokemon: Pokemon,
  matches: Match[],
) {
  let count = 0
  level: for (let i = 0; i < relevantCPM.length; i++) {
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
    atk: for (let atk = minAtk; atk <= maxAtk; atk++) {
      def: for (let def = minDef; def <= maxDef; def++) {
        sta: for (let sta = minSta; sta <= maxSta; sta++) {
          const iv = (atk + def + sta) / 45
          if (iv >= minIv && iv <= maxIv) {
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
                iv: Math.round(iv * 100),
              })
            }
          }
        }
      }
    }
  }
  return count
}
