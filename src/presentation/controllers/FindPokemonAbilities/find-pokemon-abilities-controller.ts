import { Controller, UseCase } from '@/contracts'
import { HttpRequest, HttpResponse } from '@/contracts/http'
import { MissingParamError } from '@/helpers/errors/missing-param-error'
import { FindPokemonAbilitiesResponse } from '@/presentation/contracts/find-pokemon-abilities-response'

export class FindPokemonAbilitiesController
  implements Controller<FindPokemonAbilitiesResponse>
{
  constructor(
    private readonly findPokemonAbilitiesService: UseCase<
      string,
      Promise<FindPokemonAbilitiesResponse>
    >
  ) {}

  async exec(
    request: HttpRequest
  ): Promise<HttpResponse<FindPokemonAbilitiesResponse>> {
    try {
      const { poke_name } = request.params
      if (!poke_name) throw new MissingParamError('poke_name')

      const abilities = await this.findPokemonAbilitiesService.exec(poke_name)

      return new HttpResponse(abilities, 'success', 200)
    } catch (error) {
      return new HttpResponse(error, 'failed', 400)
    }
  }
}
