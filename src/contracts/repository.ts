export interface Repository<Input, Output> {
  exec(params?: Input): Output
}
