import { Masterfile, Pokemon } from './types'

export async function getMasterfile() {
  const masterfile: Masterfile = await fetch(
    'https://raw.githubusercontent.com/WatWowMap/Masterfile-Generator/master/master-latest-raw.json',
    { next: { revalidate: 60 * 60 * 24 } },
  )
    .then((res) => res.json())
    .catch((err) => {
      console.log('[Masterfile]', err)
      return { pokemon: {} }
    })

  const remoteLocale: Record<string, string> = await fetch(
    `https://raw.githubusercontent.com/WatWowMap/pogo-translations/master/static/locales/en.json`,
    { next: { revalidate: 60 * 60 * 24 } },
  )
    .then((res) => res.json())
    .catch((err) => {
      console.log('[Locales]', err)
      return {}
    })

  const pokedex: Record<string, Pokemon> = {}
  Object.entries(masterfile.pokemon).forEach(([id, pkmn]) => {
    const name = remoteLocale[`poke_${id}`]
    pokedex[id] = {
      name,
      forms: [],
      megas: [],
      types: pkmn.types.map((type) => remoteLocale[`poke_type_${type}`]),
      attack: pkmn.attack,
      defense: pkmn.defense,
      stamina: pkmn.stamina,
      generation: pkmn.generation,
      unreleased: pkmn.unreleased,
      legendary: pkmn.legendary,
      mythical: pkmn.mythic,
      ultraBeast: pkmn.ultraBeast,
    }
    if (pkmn.forms) {
      pkmn.forms.forEach((formId) => {
        const form = masterfile.forms[formId]
        if (form?.attack && form?.defense && form?.stamina && +formId) {
          pokedex[id].forms.push({
            name: `${name} (${remoteLocale[`form_${formId}`]})`,
            types:
              form.types &&
              form.types.map((type) => remoteLocale[`poke_type_${type}`]),
            attack: form.attack,
            defense: form.defense,
            stamina: form.stamina,
            unreleased: form.unreleased,
          })
        }
      })
    }
    if (pkmn.tempEvolutions) {
      pkmn.tempEvolutions.forEach((mega) => {
        if (+mega.tempEvoId) {
          pokedex[id].megas.push({
            name: `${name} ${remoteLocale[`evo_${mega.tempEvoId}`]}`,
            types:
              mega.types &&
              mega.types.map((type) => remoteLocale[`poke_type_${type}`]),
            attack: mega.attack,
            defense: mega.defense,
            stamina: mega.stamina,
            unreleased: !!mega.unreleased,
          })
        }
      })
    }
  })

  return Object.values(pokedex)
}
