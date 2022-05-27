import { HttpRequest } from '@/interfaces'
import { Request, Response } from 'express'

export class ExpressRouterAdapter {
  static exec(router: any) {
    return async (req: Request, res: Response) => {
      const httpRequest: HttpRequest = {
        headers: req.headers,
        query: req.query,
        params: req.params,
        body: req.body,
      }

      const httpResponse = await router.exec(httpRequest)

      return res.status(httpResponse.status).json(httpResponse.data)
    }
  }
}
