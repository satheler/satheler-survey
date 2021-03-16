import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Question } from 'App/Models'

export default class GetQuestionController {
  public async handle ({ params, response }: HttpContextContract) {
    const question = await Question.findOrFail(params.id)
    return response.ok(question)
  }
}

