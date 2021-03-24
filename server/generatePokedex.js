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

const generatePokedex = async () => {
  const masterfile = await fetchJson('https://raw.githubusercontent.com/WatWowMap/Masterfile-Generator/master/master-latest.json')

  const newMasterfile = {}
  for (const [i, pkmn] of Object.entries(masterfile.pokemon)) {
    newMasterfile[i] = {
      name: pkmn.name,
      default_form_id: pkmn.default_form_id,
      pokedex_id: pkmn.pokedex_id,
      generation: pkmn.generation,
      types: pkmn.types,
      attack: pkmn.attack,
      defense: pkmn.defense,
      stamina: pkmn.stamina,
      legendary: pkmn.legendary,
      mythical: pkmn.mythic,
      forms: [],
    }
    const forms = Object.keys(pkmn.forms)
    for (let j = 0; j <= forms.length; j++) {
      const formName = pkmn.forms[forms[j]]
      if (formName && formName.attack) {
        newMasterfile[i].forms.push({
          name: `${pkmn.name} (${formName.name})`,
          types: formName.types,
          attack: formName.attack,
          defense: formName.defense,
          stamina: formName.stamina,
        })
      }
    }
    if (newMasterfile[i].forms.length === 0) {
      delete newMasterfile[i].forms
    }
  }
  Fs.writeJSONSync('./src/data/pokedex.json', newMasterfile, {
    spaces: '\t',
    EOL: '\n',
  })
}

module.exports = generatePokedex
