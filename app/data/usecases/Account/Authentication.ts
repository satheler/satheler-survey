export type AuthenticationParams = {
  email: string
  password: string
}

export interface Authentication {
  auth: ({ email, password }: AuthenticationParams) => Promise<string>
}
