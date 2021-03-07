import { Validation } from '../../../contracts'
import { ValidationComposite } from '../../../lib/validation/ValidationComposite'

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate (data: any): Error {
      return null
    }
  }

  return new ValidationStub()
}

type SutTypes = {
  sut: ValidationComposite
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidationStub()
  const sut = new ValidationComposite([validationStub])

  return {
    sut,
    validationStub
  }
}

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())

    const error = sut.validate({ any_field: 'any_value' })
    expect(error).toEqual(new Error())
  })
})
