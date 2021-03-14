import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { Account } from 'App/Models'
import { Validator } from 'App/Validators/Validator'

export class CreateAccountValidator implements Validator {
  constructor (
    private readonly context: HttpContextContract
  ) { }

  public schema = schema.create({
    name: schema.string({ trim: true }, []),

    email: schema.string({ }, [
      rules.email({ sanitize: true }),
      rules.unique({ table: Account.table, column: 'email' }),
    ]),

    password: schema.string({}, [
      rules.minLength(4),
      rules.confirmed(),
    ]),
  })

  public cacheKey = this.context.routeKey

  public messages = {}
}
