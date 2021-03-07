import { RequiredFieldValidation } from '../../../lib/validation/RequiredFieldValidation'
import { ValidationComposite } from '../../../lib/validation/ValidationComposite'
import { makeCreateAccountValidation } from '../../../start/factories/CreateAccountValidationFactory'

jest.mock('../../../lib/validation/ValidationComposite')

describe('CreateAccountValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeCreateAccountValidation()

    const requiredFields = ['name', 'email']
    const requiredFieldsValidations = requiredFields.map(field => new RequiredFieldValidation(field))

    expect(ValidationComposite).toHaveBeenCalledWith(requiredFieldsValidations)
  })
})
