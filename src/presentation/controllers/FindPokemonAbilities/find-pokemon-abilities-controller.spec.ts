import { HttpRequest, HttpResponse } from '@/contracts/http'
import { FindPokemonAbilitiesController } from './find-pokemon-abilities-controller'

class ServiceSpy {
  calls = 0
  usedParam = ''
  returnParam = ['vrau', 'poder 2']
  async exec(usedParam: string) {
    this.calls++
    this.usedParam = usedParam
    return this.returnParam
  }
}

function makeSut() {
  const serviceSpy = new ServiceSpy()
  const poke_name = 'pikachu'
  const request = { params: { poke_name } } as HttpRequest
  const sut = new FindPokemonAbilitiesController(serviceSpy)

  return { sut, poke_name, request, serviceSpy }
}

describe('FindPokemonAbilitiesController', () => {
  test('FindPokemonAbilitiesController should be defined', () => {
    const { sut } = makeSut()

    expect(sut).toBeDefined()
  })

  test('should throw a MissingParamError if poke_name was not provided', async () => {
    const { sut } = makeSut()

    const res = await sut.exec({ params: { poke_name: null } } as HttpRequest)

    expect(res).toEqual(
      new HttpResponse('Missing param: poke_name', 'failed', 404)
    )
  })

  test('should call service with poke_name', async () => {
    const { sut, poke_name, request, serviceSpy } = makeSut()

    await sut.exec(request)

    expect(serviceSpy.calls).toBe(1)
    expect(serviceSpy.usedParam).toBe(poke_name)
  })

  test('should return a HttpResponse with pokemon abilities', async () => {
    const { sut, poke_name, request, serviceSpy } = makeSut()

    const response = await sut.exec(request)

    expect(response).toEqual(
      new HttpResponse(serviceSpy.returnParam, 'success', 200)
    )
    expect(serviceSpy.usedParam).toBe(poke_name)
  })
})
