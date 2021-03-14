import { Encrypter } from '../../../contracts'
import { Account, AddAccount, AddAccountParams } from '../../domain/entities/Account'
import { AddAccountRepository } from '../../repositories/contracts/account/AddAccountRepository'

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
