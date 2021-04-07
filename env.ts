/*
|--------------------------------------------------------------------------
| Validating Environment Variables
|--------------------------------------------------------------------------
|
| In this file we define the rules for validating environment variables.
| By performing validation we ensure that your application is running in
| a stable environment with correct configuration values.
|
| This file is read automatically by the framework during the boot lifecycle
| and hence do not rename or move this file to a different location.
|
*/

import Env from '@ioc:Adonis/Core/Env'

export default Env.rules({
  /**
   * Environment
   */
  NODE_ENV: Env.schema.enum(['development', 'production', 'testing'] as const),

  /**
   * Application
   */
  HOST: Env.schema.string.optional({ format: 'host' }),
  PORT: Env.schema.number.optional(),
  APP_NAME: Env.schema.string(),
  APP_KEY: Env.schema.string(),

  /**
   * Database
   */
  DB_CLIENT: Env.schema.enum.optional(['pg', 'postgres', 'postgresql', 'mysql', 'mysql2'] as const),
  DB_CONNECTION: Env.schema.string.optional(),
  DB_HOST: Env.schema.string.optional({ format: 'host' }),
  DB_PORT: Env.schema.number.optional(),
  DB_USER: Env.schema.string.optional(),
  DB_PASSWORD: Env.schema.string.optional(),
  DB_NAME: Env.schema.string.optional(),

  /**
   * Security
   */
  HASH_DRIVER: Env.schema.enum(['bcrypt', 'argon'] as const),

  /**
   * Cloud
   */
  CLOUD_PROVIDER: Env.schema.string.optional(),
})
