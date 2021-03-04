import { Account } from '../../../models/Account'

export type AddAccountParams = Omit<Account, 'id'>

export interface AddAccount {
  add: (params: AddAccountParams) => Promise<Account>
}
