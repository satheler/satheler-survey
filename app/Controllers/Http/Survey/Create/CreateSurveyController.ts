import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AccessDeniedException from 'App/Exceptions/AccessDeniedException'
import { Survey } from 'App/Models'
import { CreateSurveyValidator } from './CreateSurveyValidator'

export default class CreateSurveyController {
  public async handle (context: HttpContextContract) {
    const { request, response, auth } = context
    const validator = new CreateSurveyValidator(context)
    const requestData = await request.validate(validator)

    if(auth.user?.id !== requestData.account_id) {
      throw new AccessDeniedException()
    }

    const survey = await Survey.create(requestData)
    await survey.refresh()

    return response.created(survey)
  }
}

