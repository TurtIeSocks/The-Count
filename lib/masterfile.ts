import { Masterfile, Pokedex } from './types'

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

  const pokedex: Pokedex = []
  Object.entries(masterfile.pokemon).forEach(([id, pkmn]) => {
    const name = remoteLocale[`poke_${id}`]
    const types = pkmn.types.map((type) => remoteLocale[`poke_type_${type}`])
    pokedex.push({
      name,
      types,
      attack: pkmn.attack,
      defense: pkmn.defense,
      stamina: pkmn.stamina,
      generation: pkmn.generation,
      unreleased: pkmn.unreleased,
      legendary: pkmn.legendary,
      mythical: pkmn.mythic,
      ultraBeast: pkmn.ultraBeast,
      form: false,
      mega: false,
    })
    if (pkmn.forms) {
      pkmn.forms.forEach((formId) => {
        const form = masterfile.forms[formId]
        if (form?.attack && form?.defense && form?.stamina && +formId) {
          pokedex.push({
            name: `${name} (${remoteLocale[`form_${formId}`]})`,
            types: form.types
              ? form.types.map((type) => remoteLocale[`poke_type_${type}`])
              : types,
            attack: form.attack,
            defense: form.defense,
            stamina: form.stamina,
            unreleased: form.unreleased,
            generation: pkmn.generation,
            legendary: pkmn.legendary,
            mythical: pkmn.mythic,
            ultraBeast: pkmn.ultraBeast,
            form: true,
            mega: false,
          })
        }
      })
    }
    if (pkmn.tempEvolutions) {
      pkmn.tempEvolutions.forEach((mega) => {
        if (+mega.tempEvoId) {
          pokedex.push({
            name: `${name} ${remoteLocale[`evo_${mega.tempEvoId}`]}`,
            types: mega.types
              ? mega.types.map((type) => remoteLocale[`poke_type_${type}`])
              : types,
            attack: mega.attack || pkmn.attack,
            defense: mega.defense || pkmn.defense,
            stamina: mega.stamina || pkmn.stamina,
            unreleased: !!mega.unreleased,
            generation: pkmn.generation,
            legendary: pkmn.legendary,
            mythical: pkmn.mythic,
            ultraBeast: pkmn.ultraBeast,
            form: false,
            mega: true,
          })
        }
      })
    }
  })

  return Object.values(pokedex)
}
