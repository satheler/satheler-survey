import Env from '@ioc:Adonis/Core/Env'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CloudProviderMiddleware {
  public async handle ({ response }: HttpContextContract, next: () => Promise<void>) {
    response.append('x-cloud-provider', Env.get('DB_CONNECTION', 'local'))
    await next()
  }
}
