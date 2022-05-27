import { Router } from 'express'

import { makeFindPokemonAbilitiesController } from '@/main/factories'
import { ExpressRouterAdapter } from '@/helpers/adapters/express-router-adapter'
import { FindPokemonAbilitiesController } from '@/presentation/controllers/FindPokemonAbilities/find-pokemon-abilities-controller'
const routes = Router()

export class PokemonsRoutes {
  private findPokemonAbilities: FindPokemonAbilitiesController
  constructor() {
    this.findPokemonAbilities = makeFindPokemonAbilitiesController()
  }

  exec() {
    routes.get(
      '/abilities/:poke_name',
      ExpressRouterAdapter.exec(this.findPokemonAbilities)
    )

    return routes
  }
}
