import express, { Express } from 'express'
import cors from 'cors'

import { PokemonsRoutes } from './routes'

export class AppController {
  public app: Express
  private pokemonsRoutes: PokemonsRoutes

  constructor() {
    this.app = express()

    this.pokemonsRoutes = new PokemonsRoutes()

    this.loadMiddlewares()
    this.loadRoutes()
  }

  private loadMiddlewares() {
    this.app.use(express.json())
    this.app.use(cors())
  }

  private loadRoutes() {
    this.app.use('/api/pokemons', this.pokemonsRoutes.exec())
  }
}
