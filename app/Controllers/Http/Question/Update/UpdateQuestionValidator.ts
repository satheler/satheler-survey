import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import { Validator } from 'App/Validators/Validator'

export class UpdateQuestionValidator implements Validator {
  constructor (
    private readonly context: HttpContextContract
  ) { }

  public schema = schema.create({
    question: schema.string.optional({ trim: true }, []),

    is_required: schema.boolean.optional(),
  })

  public cacheKey = this.context.routeKey

  public messages = {}
}
