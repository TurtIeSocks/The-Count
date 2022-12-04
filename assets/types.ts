export interface Form {
  name: string
  attack: number
  defense: number
  stamina: number
  types: string[]
  unreleased: boolean
}

export interface Pokemon extends Form {
  generation: number
  forms: Form[]
  megas: Form[]
  legendary: boolean
  mythical: boolean
  ultraBeast: boolean
}

export type Pokedex = Pokemon[]

export interface Match {
  name: string
  atk: number
  def: number
  sta: number
  level: number
  iv: number
}

export interface Filters {
  cp: number
  atk: number[]
  def: number[]
  sta: number[]
  level: number[]
  iv: number[]
  generations: Record<string, boolean>
  types: Record<string, boolean>
  forms: boolean
  megas: boolean
  legends: boolean
  mythics: boolean
  unreleased: boolean
}

export type Column = keyof Match
