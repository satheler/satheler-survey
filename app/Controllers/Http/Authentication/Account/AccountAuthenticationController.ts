import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { AccountAuthenticationValidator } from './AccountAuthenticationValidator'

export default class AccountAuthenticationsController {
  public async handle (context: HttpContextContract) {
    const { request, response, auth } = context
    const validator = new AccountAuthenticationValidator(context)
    const { username, password } = await request.validate(validator)

    const { token, type, expiresIn } = await auth.use('api').attempt(username, password)

    return response.ok({ access_token: token, token_type: type, expires_in: expiresIn })
  }
}
