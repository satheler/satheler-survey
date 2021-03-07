import { Controller } from '../../../../contracts'
import { CreateAccountController } from '../../../../app/controllers/account/CreateAccountController'
import { DatabaseAddAccount } from '../../../../app/usecases/DatabaseAddAccount'
import { BcryptAdapter } from '../../../../lib/criptography/BcryptAdapter'
import { AccountDynamoDbRepository } from '../../../../app/repositories/dynamodb/AccountRepository'
import { makeCreateAccountValidation } from './CreateAccountValidationFactory'

export const makeCreateAccountController = (): Controller => {
  const validationComposite = makeCreateAccountValidation()
  const encrypter = new BcryptAdapter()
  const accountRepository = new AccountDynamoDbRepository()
  const addAccount = new DatabaseAddAccount(encrypter, accountRepository)
  return new CreateAccountController(validationComposite, addAccount)
}
