import { ValidationError } from '../../app/errors/ValidationError'
import { Validation } from '../../contracts'

export class ValidationComposite implements Validation {
  constructor (private readonly validations: Validation[]) {}

  validate (data: any): Error {
    const errors: Error[] = []

    for (const validation of this.validations) {
      const error = validation.validate(data)
      if (error) {
        errors.push(error)
      }
    }

    if (errors.length) {
      return new ValidationError(errors)
    }
  }
}
