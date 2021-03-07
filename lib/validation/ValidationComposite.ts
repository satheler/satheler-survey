import { Validation } from '../../contracts'

export class ValidationComposite implements Validation {
  constructor (private readonly validations: Validation[]) {}

  validate (data: any): Error {
    for (const validation of this.validations) {
      const error = validation.validate(data)
      if (error) {
        return error
      }
    }
  }
}
