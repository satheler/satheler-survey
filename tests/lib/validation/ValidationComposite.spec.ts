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
  validationStubs: Validation[]
}

const makeSut = (): SutTypes => {
  const validationStubs = [makeValidationStub(), makeValidationStub()]
  const sut = new ValidationComposite(validationStubs)

  return {
    sut,
    validationStubs
  }
}

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new Error())

    const error = sut.validate({ any_field: 'any_value' })
    expect(error).toEqual(new Error())
  })

  test('Should return the first error if more than one validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new Error('first_field'))
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new Error('second_field'))

    const error = sut.validate({ any_field: 'any_value' })
    expect(error).toEqual(new Error('first_field'))
  })
})
