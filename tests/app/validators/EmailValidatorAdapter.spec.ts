import { EmailValidatorAdapter } from '../../../app/validators/EmailValidatorAdapter'

describe('EmailValidator Adapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('invalid@mail.com')
    expect(isValid).toBe(false)
  })
})
