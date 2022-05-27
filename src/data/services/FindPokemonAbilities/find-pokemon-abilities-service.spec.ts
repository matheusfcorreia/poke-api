import { FindPokemonAbilitiesNamesService } from './find-pokemon-abilities-service'
import { Pokemon } from '@/domain/entities/pokemon'
import { MissingParamError } from '@/helpers/errors/missing-param-error'
import { makePokemon } from '@/test/makePokemon'

class FindPokemonByNameSpy {
  calls = 0
  receivedParams: string
  pokemon: Pokemon
  async exec(receivedParam: string) {
    this.receivedParams = receivedParam
    this.calls++
    return this.pokemon
  }
}

function makeSut() {
  const findPokemonByNameSpy = new FindPokemonByNameSpy()
  const pokemonName = 'pikachu'
  const pokemon = makePokemon().pokemon
  const orderedAbilities = makePokemon().orderedAbilities

  const sut = new FindPokemonAbilitiesNamesService(findPokemonByNameSpy)

  return {
    sut,
    pokemonName,
    pokemon,
    orderedAbilities,
    findPokemonByNameSpy,
  }
}

describe('FindPokemonAbilitiesService', () => {
  test('FindPokemonAbilitiesService should be defined', () => {
    const { sut } = makeSut()

    expect(sut).toBeDefined()
  })

  test('should throw a MissingParamError if pokemonName was not provided', async () => {
    const { sut } = makeSut()

    const res = sut.exec(null)

    await expect(res).rejects.toThrow(new MissingParamError('pokemonName'))
  })

  test('should call findPokemonByName with pokemonName', async () => {
    const { sut, findPokemonByNameSpy, pokemonName, pokemon } = makeSut()

    findPokemonByNameSpy.pokemon = pokemon
    await sut.exec(pokemonName)

    expect(findPokemonByNameSpy.calls).toBe(1)
    expect(findPokemonByNameSpy.receivedParams).toBe(pokemonName)
  })

  test('should return a ordered list of names of pokemon abilities', async () => {
    const {
      sut,
      findPokemonByNameSpy,
      pokemonName,
      pokemon,
      orderedAbilities,
    } = makeSut()

    findPokemonByNameSpy.pokemon = pokemon
    const abilities = await sut.exec(pokemonName)

    expect(abilities).toEqual(orderedAbilities)
  })
})
