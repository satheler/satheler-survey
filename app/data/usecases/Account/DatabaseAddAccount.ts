import { Encrypter } from '../../../../contracts'
import { AddAccount, AddAccountParams } from '../../../domain/usecases/Account/AddAccount'
import { Account } from '../../../models/Account'
import { AddAccountRepository } from '../../contracts/AddAccountRepository'

export class DatabaseAddAccount implements AddAccount {
  constructor (
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository
  ) { }

  async add ({ password, ...accountData }: AddAccountParams): Promise<Account> {
    const hashedPassword = await this.encrypter.encrypt(password)

    const account = Object.assign({ id: 'valid_id' }, accountData, { password: hashedPassword })
    await this.addAccountRepository.add(account)
    return account
  }
}
