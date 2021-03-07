import { HashComparer } from '../../../contracts'
import { TokenGenerator } from '../../../contracts/token-generator'
import { AccountAuthentication, AccountAuthenticationParams } from '../../domain/entities/Account'
import { FindAccountByEmailRepository } from '../../repositories/contracts/account/FindAccountByEmailRepository'

export class DatabaseAccountAuthentication implements AccountAuthentication {
  constructor (
    private readonly findAccountByEmailRepository: FindAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly tokenGenerator: TokenGenerator
  ) { }

  async auth ({ email, password }: AccountAuthenticationParams): Promise<string> {
    const account = await this.findAccountByEmailRepository.find({ email })
    if (!account) {
      return null
    }

    const isValidPassword = await this.hashComparer.compare(password, account.password)
    if (!isValidPassword) {
      return null
    }

    const accessToken = await this.tokenGenerator.generate(account.id)
    return accessToken
  }
}
