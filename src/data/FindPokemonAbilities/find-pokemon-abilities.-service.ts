import { Repository, UseCase } from '@/contracts'
import { Pokemon } from '@/domain/entities/pokemon'
import { MissingParamError } from '@/helpers/errors/missing-param-error'

export class FindPokemonAbilitiesNamesService
  implements UseCase<string, Promise<string[]>>
{
  constructor(
    private readonly findPokemonByName: Repository<string, Promise<Pokemon>>
  ) {}

  async exec(pokemonName: string): Promise<string[]> {
    if (!pokemonName) throw new MissingParamError('pokemonName')

    const pokemon = await this.findPokemonByName.exec(pokemonName)

    const abilityNames = pokemon.abilities.map((fullAbility) => {
      return fullAbility.ability.name
    })

    return abilityNames.sort((abilityA, abilityB) =>
      abilityA > abilityB ? 1 : -1
    )
  }
}
