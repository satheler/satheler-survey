import { SignUpController } from '../../app/controllers/Account/SignUpController'
import { DatabaseAddAccount } from '../../app/data/usecases/Account/DatabaseAddAccount'
import { EmailValidatorAdapter } from '../../app/validators/EmailValidatorAdapter'
import { BcryptAdapter } from '../../lib/criptography/BcryptAdapter'
import { AccountDynamoDbRepository } from '../../lib/database/dynamodb/repositories/AccountDynamoDbRepository'

export const makeSignUpController = (): SignUpController => {
  const emailValidator = new EmailValidatorAdapter()
  const encrypter = new BcryptAdapter()
  const accountRepository = new AccountDynamoDbRepository()
  const addAccount = new DatabaseAddAccount(encrypter, accountRepository)
  return new SignUpController(emailValidator, addAccount)
}
