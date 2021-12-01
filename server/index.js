/* eslint-disable no-console */
const express = require('express')
const path = require('path')
const { generate } = require('pogo-data-generator')
const logger = require('morgan')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000

app.use(logger('dev'))
app.use(express.static(path.join(__dirname, '../dist')))

const pokedex = {}

const generatePokedex = async () => {
  try {
    const { pokemon } = await generate({
      template: {
        pokemon: {
          enabled: true,
          options: {
            keys: {
              main: 'pokedexId',
            },
            includeProtos: true,
            customFields: {
              formName: 'name',
              pokemonName: 'name',
            },
            includeEstimatedPokemon: {
              baseStats: true,
              mega: true,
            },
          },
          template: {
            pokemonName: true,
            forms: {
              formName: true,
              attack: true,
              defense: true,
              stamina: true,
              types: 'typeName',
            },
            generation: true,
            types: 'typeName',
            attack: true,
            defense: true,
            stamina: true,
            tempEvolutions: {
              tempEvoId: true,
              attack: true,
              defense: true,
              stamina: true,
              types: 'typeName',
              unreleased: true,
            },
            legendary: true,
            mythic: true,
            unreleased: true,
          },
        },
      },
    })
    Object.entries(pokemon).forEach(([id, pkmn]) => {
      pokedex[id] = {
        ...pkmn,
        name: pkmn.unreleased ? `*${pkmn.name}` : pkmn.name,
        forms: [],
        megas: [],
      }
      if (pkmn.forms) {
        pkmn.forms.forEach(form => {
          if (form.attack) {
            pokedex[id].forms.push({
              name: pkmn.unreleased ? `*${pkmn.name} (${form.name})` : `${pkmn.name} (${form.name})`,
              types: form.types,
              attack: form.attack,
              defense: form.defense,
              stamina: form.stamina,
              unreleased: form.unreleased,
            })
          }
        })
      }
      if (pkmn.tempEvolutions) {
        pkmn.tempEvolutions.forEach(mega => {
          let megaSuffix = ''
          if (mega.tempEvoId === 2) {
            megaSuffix = ' X'
          } else if (mega.tempEvoId === 3) {
            megaSuffix = ' Y'
          }
          pokedex[id].megas.push({
            name: mega.unreleased ? `*Mega ${pkmn.name}${megaSuffix}` : `Mega ${pkmn.name}${megaSuffix}`,
            types: mega.types,
            attack: mega.attack,
            defense: mega.defense,
            stamina: mega.stamina,
            unreleased: mega.unreleased,
          })
        })
      }
    })
  } catch (e) {
    console.warn('Error updating Pokedex, using existing', e.message)
  }
}
generatePokedex().then(() => console.log('Dex Generated'))

setInterval(async () => {
  await generatePokedex()
  console.log(new Date(), 'Dex Updated')
}, 1000 * 60 * 60 * 24)

app.use('/pokedex', async (req, res) => {
  try {
    res.status(200).json({ pokedex: Object.values(pokedex) })
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: e })
  }
})

app.use((req, res) => {
  res.redirect('/')
})

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server now listening on port: ${port}`)
})
