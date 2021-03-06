import { Controller, ControllerContext, EmailValidator, HttpResponse } from '../../../contracts'
import { InvalidParamError, MissingParamError } from '../../errors'

export class AccountAuthenticationController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator
  ) { }

  async handle ({ request, response }: ControllerContext): Promise<HttpResponse> {
    if (!request.body.email) {
      return response.badRequest(new MissingParamError('email'))
    }

    if (!request.body.password) {
      return response.badRequest(new MissingParamError('password'))
    }

    const isEmailValid = this.emailValidator.isValid(request.body.email)
    if (!isEmailValid) {
      return response.badRequest(new InvalidParamError('email'))
    }
  }
}
