import { FindPokemonByNameRepository } from '@/infra/FindPokemonByName/find-pokemon-by-name-repository'
import { FindPokemonAbilitiesNamesService } from '@/data/services/FindPokemonAbilities/find-pokemon-abilities-service'
import { FindPokemonAbilitiesController } from '@/presentation/controllers/FindPokemonAbilities/find-pokemon-abilities-controller'
import { pokemonApi } from '../config/services/pokemon-api'

export function makeFindPokemonAbilitiesController() {
  const repo = new FindPokemonByNameRepository(pokemonApi)
  const service = new FindPokemonAbilitiesNamesService(repo)
  return new FindPokemonAbilitiesController(service)
}
