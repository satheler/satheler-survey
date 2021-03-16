import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AccessDeniedException from 'App/Exceptions/AccessDeniedException'
import { Question } from 'App/Models'

export default class DeleteQuestionController {
  public async handle ({ auth, params, response } : HttpContextContract) {
    const question = await Question.find(params.id)
    await question?.preload('survey')

    if(!question) {
      return response.noContent()
    }

    if(auth.user?.id !== question.survey.accountId) {
      throw new AccessDeniedException()
    }

    await question.delete()
    return response.noContent()
  }
}

