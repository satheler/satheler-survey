import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AccessDeniedException from 'App/Exceptions/AccessDeniedException'
import { Survey } from 'App/Models'

export default class DeleteSurveyController {
  public async handle ({ auth, params, response } : HttpContextContract) {
    const survey = await Survey.find(params.id)

    if(!survey) {
      return response.noContent()
    }

    if(auth.user?.id !== survey.accountId) {
      throw new AccessDeniedException()
    }

    await survey.delete()
    return response.noContent()
  }
}

