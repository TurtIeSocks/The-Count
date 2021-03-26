import cpMultipliers from '../data/cpm.json'

export default (atk, def, sta, lvl) => {
  const cpm = cpMultipliers[lvl]
  const cp = Math.floor((atk * def ** 0.5 * sta ** 0.5 * cpm ** 2) / 10)
  return cp < 10 ? 10 : cp
}
