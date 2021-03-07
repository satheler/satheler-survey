import { EmailValidatorAdapter } from '../../../../app/validators/EmailValidatorAdapter'
import { Validation } from '../../../../contracts'
import { EmailValidation } from '../../../../lib/validation/EmailValidation'
import { RequiredFieldValidation } from '../../../../lib/validation/RequiredFieldValidation'
import { ValidationComposite } from '../../../../lib/validation/ValidationComposite'

export const makeAccountAuthenticationValidation = (): Validation => {
  const validations: Validation[] = []

  const requiredFields = ['email', 'password']
  const requiredFieldsValidations = requiredFields.map(field => new RequiredFieldValidation(field))

  const emailValidatorAdapter = new EmailValidatorAdapter()
  const emailValidation = new EmailValidation('email', emailValidatorAdapter)

  const validationComposite = validations.concat(requiredFieldsValidations, emailValidation)

  return new ValidationComposite(validationComposite)
}
