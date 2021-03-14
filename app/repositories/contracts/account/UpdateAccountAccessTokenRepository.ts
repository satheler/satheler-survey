export interface UpdateAccountAccessTokenRepository {
  update: (id: string, token: string) => Promise<void>
}
