import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { Question, Survey } from 'App/Models'
import { Validator } from 'App/Validators/Validator'

export class CreateRespondentValidator implements Validator {
  constructor (
    private readonly context: HttpContextContract
  ) { }

  public refs = schema.refs({
    surveyId: this.context.request.input('survey_id'),
  })

  public answersSchema = schema.object().members({
    question_id: schema.string({}, [
      rules.exists({
        table: Question.table,
        column: 'id',
        where: {
          survey_id: this.refs.surveyId,
        },
      }),
    ]),

    answer: schema.string({ trim: true }),
  })

  public schema = schema.create({
    survey_id: schema.string({ trim: true }, [
      rules.exists({ table: Survey.table, column: 'id' }),
    ]),

    answers: schema.array().members(this.answersSchema),
  })

  public cacheKey = this.context.routeKey

  public messages = {}
}
