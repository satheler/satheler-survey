import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AccountDataAuthenticationController {
  public async handle ({ response, auth }: HttpContextContract) {
    await auth.user
    return response.ok(auth.user)
  }
}
