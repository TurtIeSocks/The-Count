/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */

const Fetch = require('node-fetch')
const Fs = require('fs-extra')

function fetchJson(url) {
  return new Promise(resolve => {
    Fetch(url)
      .then(res => res.json())
      .then(json => resolve(json))
  })
}

((async function generate() {
  const masterfile = await fetchJson('https://raw.githubusercontent.com/WatWowMap/Masterfile-Generator/master/master-latest.json')

  const pokedex = {}
  for (const [i, pkmn] of Object.entries(masterfile.pokemon)) {
    pokedex[i] = {
      name: pkmn.name,
      generation: pkmn.generation,
      types: pkmn.types,
      attack: pkmn.attack,
      defense: pkmn.defense,
      stamina: pkmn.stamina,
      legendary: pkmn.legendary,
      mythical: pkmn.mythic,
      forms: [],
      megas: [],
    }
    const forms = Object.keys(pkmn.forms)
    for (let j = 0; j < forms.length; j++) {
      const formName = pkmn.forms[forms[j]]
      if (formName && formName.attack) {
        pokedex[i].forms.push({
          name: `${pkmn.name} (${formName.name})`,
          types: formName.types,
          attack: formName.attack,
          defense: formName.defense,
          stamina: formName.stamina,
        })
      }
    }
    if (pokedex[i].forms.length === 0) {
      delete pokedex[i].forms
    }
    if (pkmn.temp_evolutions) {
      const megas = Object.keys(pkmn.temp_evolutions)
      for (let j = 0; j < megas.length; j++) {
        if (megas) {
          const megaForm = pkmn.temp_evolutions[megas[j]]
          let megaSuffix = ''
          if (megas[j] === '2') {
            megaSuffix = ' X'
          } else if (megas[j] === '3') {
            megaSuffix = ' Y'
          }
          pokedex[i].megas.push({
            name: `Mega ${pkmn.name}${megaSuffix}`,
            types: megaForm.types,
            attack: megaForm.attack,
            defense: megaForm.defense,
            stamina: megaForm.stamina,
          })
        }
      }
    }
    if (pokedex[i].megas.length === 0) {
      delete pokedex[i].megas
    }
  }
  Fs.writeJSONSync('./src/data/pokedex.json', pokedex, {
    spaces: '\t',
    EOL: '\n',
  })
})())
