import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Account } from 'App/Models'
import { CreateAccountValidator } from './CreateAccountValidator'

export default class CreateAccountController {
  public async handle (context: HttpContextContract) {
    const { request, response, auth } = context
    const validator = new CreateAccountValidator(context)
    const requestData = await request.validate(validator)

    const account = await Account.create(requestData)

    const { token, type, expiresIn } = await auth.use('api').loginViaId(account.id)
    return response.created({ ...account.toJSON(), access_token: token, token_type: type, expires_in: expiresIn })
  }
}
