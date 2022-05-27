import { HttpRequest, HttpResponse } from '@/interfaces'

export interface Controller<Output> {
  exec(request?: HttpRequest): Promise<HttpResponse<Output>>
}
