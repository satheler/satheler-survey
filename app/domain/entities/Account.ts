export interface Account {
  id: string
  name: string
  email: string
  password: string
}

export type AddAccountParams = Omit<Account, 'id'>
export interface AddAccount {
  add: (params: AddAccountParams) => Promise<Account>
}

export type AccountAuthenticationParams = Pick<Account, 'email' | 'password'>
export interface AccountAuthentication {
  auth: ({ email, password }: AccountAuthenticationParams) => Promise<string>
}
