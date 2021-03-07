import { Controller } from '../../contracts'
import { CreateAccountController } from '../../app/controllers/account/CreateAccountController'
import { DatabaseAddAccount } from '../../app/data/usecases/Account/DatabaseAddAccount'
import { EmailValidatorAdapter } from '../../app/validators/EmailValidatorAdapter'
import { BcryptAdapter } from '../../lib/criptography/BcryptAdapter'
import { AccountDynamoDbRepository } from '../../app/repositories/dynamodb/AccountRepository'
import { makeCreateAccountValidation } from './CreateAccountValidationFactory'

export const makeCreateAccountController = (): Controller => {
  const validationComposite = makeCreateAccountValidation()
  const emailValidator = new EmailValidatorAdapter()
  const encrypter = new BcryptAdapter()
  const accountRepository = new AccountDynamoDbRepository()
  const addAccount = new DatabaseAddAccount(encrypter, accountRepository)
  return new CreateAccountController(validationComposite, emailValidator, addAccount)
}
