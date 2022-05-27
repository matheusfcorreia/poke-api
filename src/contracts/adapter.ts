export interface Adapter<Input, FormatterInput> {
  exec(params?: Input): FormatterInput
}
