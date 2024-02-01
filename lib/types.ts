export interface Form {
  name: string
  attack: number
  defense: number
  stamina: number
  types?: string[]
  unreleased: boolean
}

export interface Pokemon extends Form {
  generation: string
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

export interface SliderProps {
  name: string
  shortName: Exclude<keyof Match, 'name'>
  min: number
  max: number
}

export interface MasterfilePkmn {
  pokemonName: string
  pokedexId: number
  defaultFormId: number
  types: number[]
  generation: string
  forms: number[]
  attack: number
  defense: number
  stamina: number
  height: number
  weight: number
  family: number
  legendary: boolean
  mythic: boolean
  unreleased: boolean
  ultraBeast: boolean
  tempEvolutions: {
    tempEvoId: number
    attack: number
    defense: number
    stamina: number
    types?: number[]
    unreleased?: boolean
  }[]
}

export interface MasterfileForm {
  formName: string
  formId: number
  attack?: number
  defense?: number
  stamina?: number
  types?: number[]
  unreleased: boolean
}

export interface Masterfile {
  pokemon: Record<string, MasterfilePkmn>
  forms: Record<string, MasterfileForm>
}
