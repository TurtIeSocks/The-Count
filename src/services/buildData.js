/* eslint-disable no-plusplus */
/* eslint-disable no-unused-labels */
/* eslint-disable nonblock-statement-body-position */
/* eslint-disable no-labels */
/* eslint-disable no-restricted-syntax */

import masterfile from '../data/masterfile.json'
import cpCalc from './cpCalculator'
import cpm from '../data/cpm.json'

const buildData = (selectedCP, minAtk, maxAtk, minDef, maxDef, minSta, maxSta, minLevel, maxLevel, minIv, maxIv) => {
  const matches = []
  pokemon: for (const [i, pokemon] of Object.entries(masterfile.pokemon)) {
    const maxCp = cpCalc(pokemon.attack + maxAtk, pokemon.defense + maxDef, pokemon.stamina + maxSta, maxLevel, minIv)
    if (maxCp >= selectedCP) {
      level: Object.keys(cpm).forEach(level => {
        if (level >= minLevel && level <= maxLevel) {
          atk: for (let a = minAtk; a <= maxAtk; a++) {
            def: for (let d = minDef; d <= maxDef; d++) {
              sta: for (let s = minSta; s <= maxSta; s++) {
                const iv = (a + d + s) / 45
                if (iv >= minIv && iv <= maxIv) {
                  const cp = cpCalc(pokemon.attack + a, pokemon.defense + d, pokemon.stamina + s, level)
                  if (cp === selectedCP) {
                    matches.push(
                      {
                        num: i,
                        name: pokemon.name,
                        atk: a,
                        def: d,
                        sta: s,
                        level,
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
  return matches
}

export default buildData
