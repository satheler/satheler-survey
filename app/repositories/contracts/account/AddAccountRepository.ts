import { Account } from '../../../domain/entities/Account'

export interface AddAccountRepository {
  add: (account: Account) => Promise<Account>
}
