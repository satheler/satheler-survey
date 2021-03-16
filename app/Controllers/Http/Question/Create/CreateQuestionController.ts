import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AccessDeniedException from 'App/Exceptions/AccessDeniedException'
import { Question, Survey } from 'App/Models'
import { CreateQuestionValidator } from './CreateQuestionValidator'

export default class CreateQuestionController {
  public async handle (context: HttpContextContract) {
    const { request, response, auth } = context
    const validator = new CreateQuestionValidator(context)
    const requestData = await request.validate(validator)

    const survey = await Survey.findOrFail(requestData.survey_id)
    if(auth.user?.id !== survey.accountId) {
      throw new AccessDeniedException()
    }

    const question = await Question.create(requestData)
    await question.refresh()

    return response.created(question)
  }
}

