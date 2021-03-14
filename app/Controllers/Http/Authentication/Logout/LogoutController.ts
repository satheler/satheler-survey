import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LogoutController {
  public async handle ({ auth, response }: HttpContextContract) {
    await auth.logout()
    return response.status(200)
  }
}
