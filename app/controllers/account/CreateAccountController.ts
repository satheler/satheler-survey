import { Controller, ControllerContext, HttpResponse, Validation } from '../../../contracts'
import { EmailValidator } from '../../../contracts/validator'
import { AddAccount } from '../../domain/usecases/Account/AddAccount'
import { InvalidParamError, MissingParamError } from '../../errors'

export class CreateAccountController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount
  ) { }

  async handle ({ request, response }: ControllerContext): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return response.badRequest(error)
    }
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
      console.error(error)
      return response.internalServerError()
    }
  }
}
