import { Account } from '../../../domain/entities/Account'

export type FindAccountByEmailRepositoryParams = {
  email: string
}

export interface FindAccountByEmailRepository {
  find: (params: FindAccountByEmailRepositoryParams) => Promise<Account>
}
