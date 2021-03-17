import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Respondent } from 'App/Models'

export default class GetAllRespondentsController {
  public async handle ({ request, response }: HttpContextContract) {
    const {
      page = 1,
      limit = 10,
      ...restOfWhere
    } = request.get()

    const respondents = await Respondent
      .query()
      .preload('answers')
      .where(restOfWhere)
      .paginate(page, limit)

    return response.ok(respondents)
  }
}

