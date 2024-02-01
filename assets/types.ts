export interface Form {
  name: string
  attack: number
  defense: number
  stamina: number
  types: string[]
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
  shortName: 'def' | 'atk' | 'sta' | 'level' | 'iv'
  min: number
  max: number
}

export type Column = keyof Match

export interface MasterfilePkmn {
  name: string
  pokedexId: number
  defaultFormId: number
  types: Record<string, { typeId: number; typeName: string }>
  quickMoves: Record<
    string,
    {
      moveId: number
      moveName: string
      proto: string
      type: number
      power: number
    }
  >
  chargedMoves: Record<
    string,
    {
      moveId: number
      moveName: string
      proto: string
      type: number
      power: number
    }
  >
  genId: number
  generation: string
  forms: Record<
    string,
    {
      name: string
      proto: string
      form: number
      evolutions?: Record<
        string,
        { pokemon: number; form: number; candyCost: number }
      >
    }
  >
  stats: { attack: number; defense: number; stamina: number }
  height: number
  weight: number
  family: number
  encounter: { fleeRate: number; captureRate: number }
  legendary: boolean
  mythic: boolean
  ultraBeast: boolean
  unreleased: boolean
  misc: {
    buddyGroupNumber: number
    buddyDistance: number
    buddyMegaEnergy: number
    thirdMoveStardust: number
    thirdMoveCandy: number
    gymDefenderEligible: boolean
    tradable: boolean
    transferable: boolean
  }
  evolutions?: Record<
    string,
    { pokemon: number; form: number; candyCost: number }
  >
  little: boolean
  tempEvolutions?: Record<
    string,
    {
      tempEvoId: string
      stats: { attack: number; defense: number; stamina: number }
      height: number
      weight: number
      firstEnergyCost?: number
      subsequentEnergyCost?: number
      unreleased?: boolean
    }
  >
}
