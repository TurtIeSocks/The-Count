export const chunkArray = <T>(array: T[], numberOfChunks: number): T[][] => {
  const chunks = []
  const chunkSize = Math.ceil(array.length / numberOfChunks)

  for (let i = 0; i < numberOfChunks; i++) {
    const start = i * chunkSize
    const end = start + chunkSize
    chunks.push(array.slice(start, end))
  }

  return chunks
}

export const getIv = (atk: number, def: number, sta: number) =>
  +(((atk + def + sta) / 45) * 100).toFixed(1)

export const arrayCompare = (a: number[], b: number[]) =>
  a.length === b.length && a.every((v, i) => v === b[i])

export const validateIv = (iv: number) => Math.max(0, Math.min(15, iv))

export const cpCalc = (atk: number, def: number, sta: number, cpm: number) => {
  const cp = Math.floor((atk * def ** 0.5 * sta ** 0.5 * cpm ** 2) / 10)
  return cp < 10 ? 10 : cp
}
