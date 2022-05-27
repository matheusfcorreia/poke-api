export type HttpRequest = {
  headers: {}
  query: any
  params: any
  body: any
}

export class HttpResponse<T> {
  data: T
  type: string
  status: number
  constructor(data: T, type: string, status: number) {
    this.data = data
    this.type = type
    this.status = status
  }
}
