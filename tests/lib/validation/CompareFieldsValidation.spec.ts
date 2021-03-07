import { InvalidParamError } from '../../../app/errors'
import { CompareFieldsValidation } from '../../../lib/validation/CompareFieldsValidation'

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation('any_field', 'any_field_to_compare')
}
describe('CompareFields Validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ any_field: 'any_value', any_field_to_compare: 'wrong_value' })

    expect(error).toEqual(new InvalidParamError('any_field_to_compare'))
  })
})
