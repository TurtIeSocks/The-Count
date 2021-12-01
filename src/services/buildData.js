import cpms from '@data/cpm.json'

const buildData = (
  selectedCP, minAtk, maxAtk, minDef, maxDef, minSta, maxSta, minLevel, maxLevel,
  minIv, maxIv, gens, types, forms, megas, legends, mythics, unreleased, pokedex,
) => {
  const matches = []
  const emptyArr = Array(16).fill(0)

  if (selectedCP < 10) {
    return matches
  }
  const cpCalc = (atk, def, sta, cpm) => {
    const cp = Math.floor((atk * def ** 0.5 * sta ** 0.5 * cpm ** 2) / 10)
    return cp < 10 ? 10 : cp
  }

  const getMatches = (pokemon) => {
    const localMatches = []
    if (gens[pokemon.generation] && (types[pokemon.types[0]] || types[pokemon.types[1]])) {
      Object.entries(cpms).forEach(([level, cpm]) => {
        if (level >= minLevel && level <= maxLevel) {
          const minCp = cpCalc(pokemon.attack + minAtk, pokemon.defense + minDef, pokemon.stamina + minSta, cpm)
          if (minCp > selectedCP) {
            return
          }
          const maxCp = cpCalc(pokemon.attack + maxAtk, pokemon.defense + maxDef, pokemon.stamina + maxSta, cpm)
          if (maxCp < selectedCP) {
            return
          }
          emptyArr.forEach((_, a) => {
            emptyArr.forEach((__, d) => {
              emptyArr.forEach((___, s) => {
                const iv = Math.floor(((a + d + s) / 45) * 100)
                if (iv >= minIv && iv <= maxIv) {
                  if (cpCalc(pokemon.attack + a, pokemon.defense + d, pokemon.stamina + s, cpm) === selectedCP) {
                    localMatches.push(
                      {
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
              })
            })
          })
        }
      })
    }
    return localMatches
  }

  pokedex.forEach(pokemon => {
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
      pokemon.forms.forEach(form => {
        matches.push(...getMatches({
          ...form,
          types: form.types || pokemon.types,
          generation: pokemon.generation,
        }))
      })
    }
    if (megas) {
      pokemon.megas.forEach(mega => {
        if (mega.unreleased && !unreleased) {
          return
        }
        matches.push(...getMatches({
          ...mega,
          types: mega.types || pokemon.types,
          generation: pokemon.generation,
        }))
      })
    }
  })

  return matches
}

export default buildData
