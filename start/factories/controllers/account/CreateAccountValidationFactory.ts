import { EmailValidatorAdapter } from '../../../../app/validators/EmailValidatorAdapter'
import { Validation } from '../../../../contracts'
import { CompareFieldsValidation } from '../../../../lib/validation/CompareFieldsValidation'
import { EmailValidation } from '../../../../lib/validation/EmailValidation'
import { RequiredFieldValidation } from '../../../../lib/validation/RequiredFieldValidation'
import { ValidationComposite } from '../../../../lib/validation/ValidationComposite'

export const makeCreateAccountValidation = (): Validation => {
  const validations: Validation[] = []

  const requiredFields = ['name', 'email', 'password', 'password_confirmation']
  const requiredFieldsValidations = requiredFields.map(field => new RequiredFieldValidation(field))

  const comparePassword = new CompareFieldsValidation('password', 'password_confirmation')

  const emailValidatorAdapter = new EmailValidatorAdapter()
  const emailValidation = new EmailValidation('email', emailValidatorAdapter)

  const validationComposite = validations.concat(requiredFieldsValidations, comparePassword, emailValidation)

  return new ValidationComposite(validationComposite)
}
