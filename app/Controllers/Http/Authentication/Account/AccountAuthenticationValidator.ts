import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { Validator } from 'App/Validators/Validator'

export class AccountAuthenticationValidator implements Validator {
  constructor (
    private readonly context: HttpContextContract
  ) { }

  public schema = schema.create({
    username: schema.string({ trim: true }, [
      rules.email(),
    ]),
    password: schema.string({}, []),
  })

  public cacheKey = this.context.routeKey

  public messages = {}
}
