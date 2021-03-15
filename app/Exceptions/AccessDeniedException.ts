import { Exception } from '@poppinss/utils'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Logger from '@ioc:Adonis/Core/Logger'

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new AccessDeniedException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class AccessDeniedException extends Exception {
  constructor () {
    super('Access denied', 403)
  }

  public async handle (error: this, { response }: HttpContextContract) {
    Logger.warn(`Access denied: ${error.stack}`)
    return response.forbidden({ message: error.message })
  }
}
