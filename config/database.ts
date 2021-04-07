/**
 * Config source: https://git.io/JesV9
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import Env from '@ioc:Adonis/Core/Env'
import { OrmConfig } from '@ioc:Adonis/Lucid/Orm'
import { DatabaseConfig } from '@ioc:Adonis/Lucid/Database'

const connections = makeConnections()

const databaseConfig: DatabaseConfig & { orm: Partial<OrmConfig> } = {
  /*
  |--------------------------------------------------------------------------
  | Connection
  |--------------------------------------------------------------------------
  |
  | The primary connection for making database queries across the application
  | You can use any key from the `connections` object defined in this same
  | file.
  |
  */
  connection: Env.get('DB_CONNECTION', 'main'),

  /*
    |--------------------------------------------------------------------------
    | Database config
    |--------------------------------------------------------------------------
    |
    | Configuration for PostgreSQL database. Make sure to install the driver
    | from npm when using this connection.
    |
    */
  connections,

  /*
  |--------------------------------------------------------------------------
  | ORM Configuration
  |--------------------------------------------------------------------------
  |
  | Following are some of the configuration options to tweak the conventional
  | settings of the ORM. For example:
  |
  | - Define a custom function to compute the default table name for a given model.
  | - Or define a custom function to compute the primary key for a given model.
  |
  */
  orm: {},
}

export default databaseConfig

function makeConnections () {
  const ALTERNATIVE_DATABASE_PATTERN = /^DB_((.+)_)?HOST$/

  return Object.keys(process.env)
    .filter(environmentVariable => ALTERNATIVE_DATABASE_PATTERN.test(environmentVariable))
    .reduce<DatabaseConfig['connections']>((alternativeDatabases, alternativeDatabase) => {
      const DB_CONNECTION_NAME_POSITION = 2
      const alternativeDatabaseSplitName = alternativeDatabase.split(ALTERNATIVE_DATABASE_PATTERN)
      const alternativeDatabaseName = alternativeDatabaseSplitName[DB_CONNECTION_NAME_POSITION] || 'main'
      const key = alternativeDatabaseName === 'main' ? '' : `${alternativeDatabaseName}_`

      const alternativeDatabaseNameLowercase = alternativeDatabaseName.toLocaleLowerCase()

      alternativeDatabases[alternativeDatabaseNameLowercase] = {
        client: Env.get('DB_CLIENT', 'pg'),
        connection: {
          host: Env.get(`DB_${key}HOST`),
          port: Env.get(`DB_${key}PORT`),
          user: Env.get(`DB_${key}USER`),
          password: Env.get(`DB_${key}PASSWORD`, ''),
          database: Env.get(`DB_${key}NAME`),
        },
        healthCheck: true,
        debug: true,
      }

      return alternativeDatabases
    }, {})
}
