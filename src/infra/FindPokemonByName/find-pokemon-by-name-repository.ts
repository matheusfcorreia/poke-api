import { Repository } from '@/contracts'
import { FindPokemonByNameRepoParams } from '@/data/contracts/find-pokemon-by-name-repo-params'
import { Pokemon } from '@/domain/entities/pokemon'
import { MissingParamError } from '@/helpers/errors/missing-param-error'
import { Axios } from 'axios'

export class FindPokemonByNameRepository
  implements Repository<FindPokemonByNameRepoParams, Promise<Pokemon>>
{
  constructor(private readonly pokemonApi: Axios) {}
  async exec(pokemonName: string): Promise<Pokemon> {
    if (!pokemonName) throw new MissingParamError('pokemonName')

    const { data } = await this.pokemonApi.get(`/pokemon/${pokemonName}`)

    return data
  }
}
