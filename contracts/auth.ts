/**
 * Contract source: https://git.io/JvyKD
 *
 * Feel free to let us know via PR, if you find something broken in this
 * file.
 */

import { Account } from 'App/Models'

declare module '@ioc:Adonis/Addons/Auth' {
  /*
  |--------------------------------------------------------------------------
  | Providers
  |--------------------------------------------------------------------------
  |
  | The providers are used to fetch accounts. The Auth module comes pre-bundled
  | with two providers that are `Lucid` and `Database`. Both uses database
  | to fetch account details.
  |
  | You can also create and register your own custom providers.
  |
  */
  interface ProvidersList {
    /*
    |--------------------------------------------------------------------------
    | Account Provider
    |--------------------------------------------------------------------------
    |
    | The following provider uses Lucid models as a driver for fetching account
    | details from the database for authentication.
    |
    | You can create multiple providers using the same underlying driver with
    | different Lucid models.
    |
    */
    account: {
      implementation: LucidProviderContract<typeof Account>,
      config: LucidProviderConfig<typeof Account>,
    },
  }

  /*
  |--------------------------------------------------------------------------
  | Guards
  |--------------------------------------------------------------------------
  |
  | The guards are used for authenticating accounts using different drivers.
  | The auth module comes with 4 different guards.
  |
  | - SessionGuardContract
  | - BasicAuthGuardContract
  | - JwtGuardContract
  | - OATGuardContract ( Opaque access token )
  |
  | Every guard needs a provider for looking up accounts from the database.
  |
  */
  interface GuardsList {
    /*
    |--------------------------------------------------------------------------
    | OAT Guard
    |--------------------------------------------------------------------------
    |
    | OAT, stands for (Opaque access tokens) guard uses database backed tokens
    | to authenticate requests.
    |
    */
    api: {
      implementation: OATGuardContract<'account', 'api'>,
      config: OATGuardConfig<'account'>,
    },
  }
}
