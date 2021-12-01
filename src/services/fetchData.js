/* eslint-disable no-console */
export default async function fetchData() {
  try {
    const response = await fetch('/pokedex')
    if (!response.ok) {
      throw new Error(`${response.status} (${response.statusText})`)
    }
    const body = await response.json()
    localStorage.setItem('pokedex', JSON.stringify(body.pokedex))
    return body.pokedex
  } catch (e) {
    const local = JSON.parse(localStorage.getItem('pokedex'))
    if (local) {
      return local
    }
    console.error(e.message, '\nUnable to fetch the Pokedex at this time, please try again later.')
    return {}
  }
}
