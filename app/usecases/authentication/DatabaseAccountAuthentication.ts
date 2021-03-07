import { AccountAuthentication, AccountAuthenticationParams } from '../../domain/entities/Account'
import { FindAccountByEmailRepository } from '../../repositories/contracts/account/FindAccountByEmailRepository'

export class DatabaseAccountAuthentication implements AccountAuthentication {
  constructor (
    private readonly findAccountByEmailRepository: FindAccountByEmailRepository
  ) { }

  async auth ({ email, password }: AccountAuthenticationParams): Promise<string> {
    await this.findAccountByEmailRepository.find({ email })

    return null
  }
}
