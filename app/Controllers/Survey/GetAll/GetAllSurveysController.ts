import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Survey } from 'App/Models'

export default class GetAllSurveysController {
  public async handle ({ request, response }: HttpContextContract) {
    const {
      page = 1,
      limit = 10,
      ...restOfWhere
    } = request.get()

    const surveys = await Survey
      .query()
      .where(restOfWhere)
      .paginate(page, limit)

    return response.ok(surveys)
  }
}

