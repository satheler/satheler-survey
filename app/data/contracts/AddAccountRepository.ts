import { Account } from '../../models/Account'

export interface AddAccountRepository {
  add: (account: Account) => Promise<Account>
}
