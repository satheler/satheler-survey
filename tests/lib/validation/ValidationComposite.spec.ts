import { Validation } from '../../../contracts'
import { ValidationComposite } from '../../../lib/validation/ValidationComposite'

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate (data: any): Error {
      return new Error()
    }
  }

  return new ValidationStub()
}

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', () => {
    const sut = new ValidationComposite([makeValidationStub()])
    const error = sut.validate({ any_field: 'any_value' })
    expect(error).toEqual(new Error())
  })
})
