import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Question } from 'App/Models'

export default class GetAllQuestionsController {
  public async handle ({ request, response }: HttpContextContract) {
    const {
      page = 1,
      limit = 10,
      ...restOfWhere
    } = request.get()

    const questions = await Question
      .query()
      .where(restOfWhere)
      .paginate(page, limit)

    return response.ok(questions)
  }
}

