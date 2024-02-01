// @ts-check

/**
 *
 * @param {number} atk
 * @param {number} def
 * @param {number} sta
 * @param {number} cpm
 * @returns {number}
 */
function cpCalc(atk, def, sta, cpm) {
  const cp = Math.floor((atk * def ** 0.5 * sta ** 0.5 * cpm ** 2) / 10)
  return cp < 10 ? 10 : cp
}

/**
 *
 * @param {import('../assets/types').Filters} filter
 * @param {[string, number][]} relevantCPM
 * @param {import('../assets/types').Pokemon} pokemon
 * @param {import('../assets/types').Match[]} matches
 * @returns {void}
 */
function buildData(
  {
    cp,
    atk: [minAtk, maxAtk],
    def: [minDef, maxDef],
    sta: [minSta, maxSta],
    level: [minLevel, maxLevel],
    iv: [minIv, maxIv],
    generations,
    types,
    forms,
    megas,
    legends,
    mythics,
    unreleased,
  },
  relevantCPM,
  pokemon,
  matches,
) {
  if (cp < 10) {
    return
  }
  /** @param {import('../assets/types').Pokemon} mon */
  const getMatches = (mon) => {
    const localMatches = []
    if (
      generations[mon.generation] &&
      (types[mon.types[0]] || types[mon.types[1]])
    ) {
      relevantCPM.forEach(([lvl, cpm]) => {
        const level = +lvl
        if (level >= minLevel && level <= maxLevel) {
          const minCp = cpCalc(
            mon.attack + minAtk,
            mon.defense + minDef,
            mon.stamina + minSta,
            cpm,
          )
          if (minCp > cp) {
            return
          }
          const maxCp = cpCalc(
            mon.attack + maxAtk,
            mon.defense + maxDef,
            mon.stamina + maxSta,
            cpm,
          )
          if (maxCp < cp) {
            return
          }
          for (let atk = minAtk; atk <= maxAtk; atk++) {
            for (let def = minDef; def <= maxDef; def++) {
              for (let sta = minSta; sta <= maxSta; sta++) {
                const iv = Math.floor(((atk + def + sta) / 45) * 100)
                if (iv >= minIv && iv <= maxIv) {
                  if (
                    cpCalc(
                      mon.attack + atk,
                      mon.defense + def,
                      mon.stamina + sta,
                      cpm,
                    ) === cp
                  ) {
                    localMatches.push({
                      name: mon.name,
                      atk,
                      def,
                      sta,
                      level,
                      iv: Math.floor(iv),
                    })
                  }
                }
              }
            }
          }
        }
      })
    }
    return localMatches
  }

  if (pokemon.legendary && !legends) {
    return
  }
  if (pokemon.mythical && !mythics) {
    return
  }
  if (pokemon.unreleased && !unreleased) {
    return
  }

  matches.push(...getMatches(pokemon))

  if (forms) {
    for (let j = 0; j < pokemon.forms.length; j++) {
      const form = pokemon.forms[j]
      matches.push(
        ...getMatches({
          ...pokemon,
          ...form,
        }),
      )
    }
  }
  if (megas) {
    for (let j = 0; j < pokemon.megas.length; j++) {
      const mega = pokemon.megas[j]
      matches.push(
        ...getMatches({
          ...pokemon,
          ...mega,
        }),
      )
    }
  }
  return
}

self.onmessage = function ({ data: { chunk, filters, relevantCPM } }) {
  let results = []
  for (let i = 0; i < chunk.length; i++) {
    buildData(filters, relevantCPM, chunk[i], results)
  }
  self.postMessage(results)
}
