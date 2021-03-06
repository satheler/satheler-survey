import { Controller, ControllerContext, EmailValidator, HttpResponse } from '../../../contracts'
import { InvalidParamError, MissingParamError } from '../../errors'

export class AccountAuthenticationController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator
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
    } catch (error) {
      return response.internalServerError()
    }
  }
}
