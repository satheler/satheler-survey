import { Validation } from '../../contracts'
import { RequiredFieldValidation } from '../../lib/validation/RequiredFieldValidation'
import { ValidationComposite } from '../../lib/validation/ValidationComposite'

export const makeCreateAccountValidation = (): Validation => {
  const requiredFields = ['name', 'email']
  const requiredFieldsValidations = requiredFields.map(field => new RequiredFieldValidation(field))

  return new ValidationComposite(requiredFieldsValidations)
}
