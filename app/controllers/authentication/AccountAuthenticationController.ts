import { Controller, ControllerContext, EmailValidator, HttpResponse } from '../../../contracts'
import { Authentication } from '../../data/usecases/Account/Authentication'
import { InvalidParamError, MissingParamError } from '../../errors'

export class AccountAuthenticationController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly authentication: Authentication
  ) { }

  async handle ({ request, response }: ControllerContext): Promise<HttpResponse> {
    try {
      const { email, password } = request.body

      if (!email) {
        return response.badRequest(new MissingParamError('email'))
      }

      if (!password) {
        return response.badRequest(new MissingParamError('password'))
      }

      const isEmailValid = this.emailValidator.isValid(email)
      if (!isEmailValid) {
        return response.badRequest(new InvalidParamError('email'))
      }

      await this.authentication.auth(request.body)
    } catch (error) {
      return response.internalServerError()
    }
  }
}
