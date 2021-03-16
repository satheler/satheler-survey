import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { Account } from 'App/Models'
import { Validator } from 'App/Validators/Validator'
import { DateTime } from 'luxon'

export class CreateSurveyValidator implements Validator {
  constructor (
    private readonly context: HttpContextContract
  ) { }

  public refs = schema.refs({
    allowedDate: DateTime.now(),
  })

  public schema = schema.create({
    name: schema.string({ trim: true }, []),

    description: schema.string.optional({ trim: true }),

    opening_time: schema.date.optional({}, [
      rules.after(this.refs.allowedDate),
      rules.beforeField('closing_time'),
    ]),

    closing_time: schema.date.optional({}, [
      rules.afterField('opening_time'),
    ]),

    account_id: schema.string({}, [
      rules.exists({
        table: Account.table,
        column: 'id',
      }),
    ]),

    authenticated_account_only: schema.boolean(),
  })

  public cacheKey = this.context.routeKey

  public messages = {}
}
