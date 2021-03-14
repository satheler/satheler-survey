/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import Logger from '@ioc:Adonis/Core/Logger'

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor () {
    super(Logger)
  }

  public async handle (error, context: HttpContextContract) {
    const { response } = context
    Logger.error(`Error code: ${error.code}`)
    switch (error.code) {
      case '23505':
        // PostgreSQL Error: Duplicate key value that violates unique constraint
        return response.badRequest({ message: 'This resource already exists' })
      case 'E_VALIDATION_FAILURE':
        return response.badRequest(error.messages)
      case 'ER_DUP_ENTRY':
        return response.badRequest({ code: error.code })
      case 'E_INVALID_AUTH_UID':
      case 'E_INVALID_AUTH_PASSWORD':
      case 'E_UNAUTHORIZED_ACCESS':
        return response.unauthorized({ message: 'Unauthorized' })
      default:
        return super.handle(error, context)
    }
  }
}
