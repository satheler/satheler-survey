import { EmailValidator, Validation } from '../../../../../contracts'
import { EmailValidation } from '../../../../../lib/validation/EmailValidation'
import { RequiredFieldValidation } from '../../../../../lib/validation/RequiredFieldValidation'
import { ValidationComposite } from '../../../../../lib/validation/ValidationComposite'
import { makeAccountAuthenticationValidation } from '../../../../../start/factories/controllers/authentication/AccountAuthenticationValidationFactory'

jest.mock('../../../../../lib/validation/ValidationComposite')

const makeEmailValidatorStub = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

describe('AccountAuthenticationValidator Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAccountAuthenticationValidation()

    const validations: Validation[] = []

    const requiredFields = ['email', 'password']
    const requiredFieldsValidations = requiredFields.map(field => new RequiredFieldValidation(field))

    const emailValidator = makeEmailValidatorStub()
    const emailValidation = new EmailValidation('email', emailValidator)

    const validationComposite = validations.concat(requiredFieldsValidations, emailValidation)

    expect(ValidationComposite).toHaveBeenCalledWith(validationComposite)
  })
})
