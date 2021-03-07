import { Validation } from '../../contracts'
import { RequiredFieldValidation } from '../../lib/validation/RequiredFieldValidation'
import { CompareFieldsValidation } from '../../lib/validation/CompareFieldsValidation'
import { ValidationComposite } from '../../lib/validation/ValidationComposite'

export const makeCreateAccountValidation = (): Validation => {
  const validations: Validation[] = []

  const requiredFields = ['name', 'email', 'password', 'password_confirmation']
  const requiredFieldsValidations = requiredFields.map(field => new RequiredFieldValidation(field))

  const comparePassword = new CompareFieldsValidation('password', 'password_confirmation')

  const validationComposite = validations.concat(requiredFieldsValidations, comparePassword)

  return new ValidationComposite(validationComposite)
}
