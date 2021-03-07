import { Controller, ControllerContext, HttpResponse, Validation } from '../../../contracts'
import { Authentication } from '../../data/usecases/Account/Authentication'

export class AccountAuthenticationController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) { }

  async handle ({ request, response }: ControllerContext): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request.body)
      if (error) {
        return response.badRequest(error)
      }

      const accessToken = await this.authentication.auth(request.body)
      if (!accessToken) {
        return response.unauthorized()
      }

      return response.ok({ access_token: accessToken })
    } catch (error) {
      return response.internalServerError()
    }
  }
}
