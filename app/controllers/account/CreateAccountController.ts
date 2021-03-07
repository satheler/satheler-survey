import { Controller, ControllerContext, HttpResponse, Validation } from '../../../contracts'
import { AddAccount } from '../../domain/usecases/Account/AddAccount'

export class CreateAccountController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addAccount: AddAccount
  ) { }

  async handle ({ request, response }: ControllerContext): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request.body)
      if (error) {
        return response.badRequest(error)
      }

      const { name, email, password } = request.body

      const account = await this.addAccount.add({ name, email, password })

      return response.ok(account)
    } catch (error) {
      console.error(error)
      return response.internalServerError()
    }
  }
}
