import { MissingParamError } from '../../../app/errors'
import { RequiredFieldValidation } from '../../../lib/validation/RequiredFieldValidation'

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation('any_field')
}
describe('RequiredField Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ another_field: 'another_field_value' })

    expect(error).toEqual(new MissingParamError('any_field'))
  })

  test('Should return nothing if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ any_field: 'any_field_value' })

    expect(error).toBeFalsy()
  })
})
