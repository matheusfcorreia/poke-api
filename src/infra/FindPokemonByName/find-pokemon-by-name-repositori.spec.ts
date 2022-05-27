import { MissingParamError } from '@/helpers/errors/missing-param-error'
import { makePokemon } from '@/test/makePokemon'
import { Axios } from 'axios'
import { FindPokemonByNameRepository } from './find-pokemon-by-name-repository'

function makeSut() {
  const pokemonResponse = makePokemon().pokemon
  const pokemonName = 'pikachu'
  const apiTestParams = {
    calls: 0,
    usedUrl: '',
  }

  const pokemonApySpy = {
    get: async (url: string) => {
      apiTestParams.calls++
      apiTestParams.usedUrl = url

      return { data: pokemonResponse }
    },
  } as Axios

  const sut = new FindPokemonByNameRepository(pokemonApySpy)

  return {
    sut,
    apiTestParams,
    pokemonResponse,
    pokemonName,
  }
}

describe('FindPokemonByNameRepository', () => {
  test('FindPokemonByNameRepository should be defined', () => {
    const { sut } = makeSut()

    expect(sut).toBeDefined()
  })

  test('should throw a MissingParamError if pokemonName was not provided', async () => {
    const { sut } = makeSut()

    const res = sut.exec(null)

    await expect(res).rejects.toThrow(new MissingParamError('pokemonName'))
  })

  test('should call pokemonApi with /pokemon/ + pokemonName', async () => {
    const { sut, apiTestParams, pokemonName } = makeSut()

    const res = await sut.exec(pokemonName)

    expect(apiTestParams.calls).toBe(1)
    expect(apiTestParams.usedUrl).toBe('/pokemon/' + pokemonName)
  })

  test('should return the data object of the pokemonApi response', async () => {
    const { sut, pokemonResponse, pokemonName } = makeSut()

    const res = await sut.exec(pokemonName)

    expect(res).toBe(pokemonResponse)
  })
})
