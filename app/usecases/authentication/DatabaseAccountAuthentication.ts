import { HashComparer } from '../../../contracts'
import { TokenGenerator } from '../../../contracts/token-generator'
import { AccountAuthentication, AccountAuthenticationParams } from '../../domain/entities/Account'
import { FindAccountByEmailRepository } from '../../repositories/contracts/account/FindAccountByEmailRepository'
import { UpdateAccountAccessTokenRepository } from '../../repositories/contracts/account/UpdateAccountAccessTokenRepository'

export class DatabaseAccountAuthentication implements AccountAuthentication {
  constructor (
    private readonly findAccountByEmailRepository: FindAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly tokenGenerator: TokenGenerator,
    private readonly updateAccountAccessTokenRepository: UpdateAccountAccessTokenRepository
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
    await this.updateAccountAccessTokenRepository.update(account.id, accessToken)
    return accessToken
  }
}
