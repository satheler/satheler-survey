import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AccessDeniedException from 'App/Exceptions/AccessDeniedException'
import { Question } from 'App/Models'
import { UpdateQuestionValidator } from './UpdateQuestionValidator'

export default class UpdateQuestionController {
  public async handle (context: HttpContextContract) {
    const { request, params, response, auth } = context
    const question = await Question.findOrFail(params.id)
    await question.preload('survey')

    if(auth.user?.id !== question.survey.accountId) {
      throw new AccessDeniedException()
    }

    const validator = new UpdateQuestionValidator(context)
    const requestData = await request.validate(validator)

    question.merge(requestData)
    await question.save()

    return response.accepted(question)
  }
}

