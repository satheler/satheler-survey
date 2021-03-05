import { Controller, ControllerContext, HttpResponse } from '../../../contracts'
import { EmailValidator } from '../../../contracts/validator'
import { AddAccount } from '../../domain/usecases/Account/AddAccount'
import { InvalidParamError, MissingParamError } from '../../errors'

export class SignUpController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount
  ) { }

  async handle ({ request, response }: ControllerContext): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'password', 'password_confirmation']

      for (const field of requiredFields) {
        if (!request.body[field]) {
          return response.badRequest(new MissingParamError(field))
        }
      }

      const { name, email, password, password_confirmation: passwordConfirmation } = request.body

      if (password !== passwordConfirmation) {
        return response.badRequest(new InvalidParamError('password_confirmation'))
      }

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return response.badRequest(new InvalidParamError('email'))
      }

      const account = await this.addAccount.add({ name, email, password })

      return response.ok(account)
    } catch (error) {
      return response.internalServerError()
    }
  }
}
