import { Encrypter } from '../../../../contracts/encrypter'
import { AddAccount, AddAccountParams } from '../../../domain/usecases/Account/AddAccount'
import { Account } from '../../../models/Account'

export class DatabaseAddAccount implements AddAccount {
  constructor (
    private readonly encrypter: Encrypter
  ) { }

  async add (params: AddAccountParams): Promise<Account> {
    await this.encrypter.encrypt(params.password)
    return null
  }
}
