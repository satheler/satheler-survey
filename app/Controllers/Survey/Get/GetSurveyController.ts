import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Survey } from 'App/Models'

export default class GetSurveyController {
  public async handle ({ params, response }: HttpContextContract) {
    const survey = await Survey.findOrFail(params.id)
    return response.ok(survey)
  }
}

