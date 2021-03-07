export class ValidationError extends Error {
  public errors: Error[]

  constructor (errors: Error[]) {
    super('Validation failure')
    this.name = 'ValidationError'
    this.errors = errors
  }
}
