import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AccountDataAuthenticationController {
  public async handle ({ response, auth }: HttpContextContract) {
    return response.ok(auth.user)
  }
}
