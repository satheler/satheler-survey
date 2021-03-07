import { Validation } from '../../../contracts'
import { CompareFieldsValidation } from '../../../lib/validation/CompareFieldsValidation'
import { RequiredFieldValidation } from '../../../lib/validation/RequiredFieldValidation'
import { ValidationComposite } from '../../../lib/validation/ValidationComposite'
import { makeCreateAccountValidation } from '../../../start/factories/CreateAccountValidationFactory'

jest.mock('../../../lib/validation/ValidationComposite')

describe('CreateAccountValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeCreateAccountValidation()

    const validations: Validation[] = []

    const requiredFields = ['name', 'email', 'password', 'password_confirmation']
    const requiredFieldsValidations = requiredFields.map(field => new RequiredFieldValidation(field))

    const comparePassword = new CompareFieldsValidation('password', 'password_confirmation')

    const validationComposite = validations.concat(requiredFieldsValidations, comparePassword)

    expect(ValidationComposite).toHaveBeenCalledWith(validationComposite)
  })
})
