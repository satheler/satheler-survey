import { MissingParamError } from '../../../app/errors'
import { RequiredFieldValidation } from '../../../lib/validation/RequiredFieldValidation'

describe('RequiredField Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = new RequiredFieldValidation('any_field')
    const error = sut.validate({ another_field: 'another_field_value' })

    expect(error).toEqual(new MissingParamError('any_field'))
  })

  test('Should return nothing if validation succeeds', () => {
    const sut = new RequiredFieldValidation('any_field')
    const error = sut.validate({ any_field: 'any_field_value' })

    expect(error).toBeFalsy()
  })
})
