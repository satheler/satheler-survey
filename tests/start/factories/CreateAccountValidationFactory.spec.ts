import { EmailValidator, Validation } from '../../../contracts'
import { CompareFieldsValidation } from '../../../lib/validation/CompareFieldsValidation'
import { EmailValidation } from '../../../lib/validation/EmailValidation'
import { RequiredFieldValidation } from '../../../lib/validation/RequiredFieldValidation'
import { ValidationComposite } from '../../../lib/validation/ValidationComposite'
import { makeCreateAccountValidation } from '../../../start/factories/CreateAccountValidationFactory'

jest.mock('../../../lib/validation/ValidationComposite')

const makeEmailValidatorStub = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

describe('CreateAccountValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeCreateAccountValidation()

    const validations: Validation[] = []

    const requiredFields = ['name', 'email', 'password', 'password_confirmation']
    const requiredFieldsValidations = requiredFields.map(field => new RequiredFieldValidation(field))

    const comparePassword = new CompareFieldsValidation('password', 'password_confirmation')

    const emailValidator = makeEmailValidatorStub()
    const emailValidation = new EmailValidation('email', emailValidator)

    const validationComposite = validations.concat(requiredFieldsValidations, comparePassword, emailValidation)

    expect(ValidationComposite).toHaveBeenCalledWith(validationComposite)
  })
})
