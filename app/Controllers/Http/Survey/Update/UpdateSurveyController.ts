import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AccessDeniedException from 'App/Exceptions/AccessDeniedException'
import { Survey } from 'App/Models'
import { UpdateSurveyValidator } from './UpdateSurveyValidator'

export default class UpdateSurveyController {
  public async handle (context: HttpContextContract) {
    const { request, params, response, auth } = context
    const survey = await Survey.findOrFail(params.id)

    if(auth.user?.id !== survey.accountId) {
      throw new AccessDeniedException()
    }

    const validator = new UpdateSurveyValidator(context)
    const requestData = await request.validate(validator)

    survey.merge(requestData)
    await survey.save()

    return response.accepted(survey)
  }
}

