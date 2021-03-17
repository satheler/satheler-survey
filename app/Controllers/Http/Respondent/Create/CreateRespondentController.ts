import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Respondent, Survey } from 'App/Models'
import { CreateRespondentValidator } from './CreateRespondentValidator'

export default class CreateRespondentController {
  public async handle (context: HttpContextContract) {
    const { request, response, auth } = context
    const validator = new CreateRespondentValidator(context)
    const requestData = await request.validate(validator)

    const survey = await Survey.findOrFail(requestData.survey_id)
    await survey.preload('questions')

    const requiredQuestions = survey.questions.filter(question => question.isRequired)

    const haveAllTheRequiredQuestionsBeenAnswered = requiredQuestions.every(requiredQuestion =>
      requestData.answers.some(answer =>
        answer.question_id === requiredQuestion.id
      )
    )

    if (!haveAllTheRequiredQuestionsBeenAnswered) {
      return response.badRequest({ message: 'Please, answer all required questions' })
    }

    const respondent = await Respondent.create({ surveyId: requestData.survey_id, accountId: auth.user?.id })
    await respondent.related('answers').createMany(requestData.answers)
    respondent.refresh()

    return response.created(respondent)
  }
}

