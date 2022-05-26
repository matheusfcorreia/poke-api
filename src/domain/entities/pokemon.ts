interface AbilityIdentification {
  name: string
  url: string
}

export interface Ability {
  ability: AbilityIdentification
  is_hidden: boolean
  slot: number
}

export interface Pokemon {
  abilities: Ability[]
}
