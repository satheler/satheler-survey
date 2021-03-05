import { Encrypter } from '../../../../contracts'
import { AddAccount, AddAccountParams } from '../../../domain/usecases/Account/AddAccount'
import { Account } from '../../../models/Account'
import { AddAccountRepository } from '../../contracts/AddAccountRepository'

export class DatabaseAddAccount implements AddAccount {
  constructor (
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository
  ) { }

  async add ({ password, ...account }: AddAccountParams): Promise<Account> {
    const hashedPassword = await this.encrypter.encrypt(password)

    const accountWithHashedPassword = Object.assign({ id: 'valid_id' }, account, { password: hashedPassword })
    await this.addAccountRepository.add(accountWithHashedPassword)
    return null
  }
}
