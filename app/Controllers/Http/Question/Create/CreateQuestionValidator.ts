import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { Survey } from 'App/Models'
import { Validator } from 'App/Validators/Validator'

export class CreateQuestionValidator implements Validator {
  constructor (
    private readonly context: HttpContextContract
  ) { }

  public schema = schema.create({
    question: schema.string({ trim: true }, []),

    is_required: schema.boolean.optional(),

    survey_id: schema.string({}, [
      rules.exists({
        table: Survey.table,
        column: 'id',
      }),
    ]),
  })

  public cacheKey = this.context.routeKey

  public messages = {}
}
