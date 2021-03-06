import { Controller, ControllerContext, HttpResponse } from '../../../contracts'
import { MissingParamError } from '../../errors'

export class AccountAuthenticationController implements Controller {
  async handle ({ request, response }: ControllerContext): Promise<HttpResponse> {
    if (!request.body.email) {
      return response.badRequest(new MissingParamError('email'))
    }

    if (!request.body.password) {
      return response.badRequest(new MissingParamError('password'))
    }
  }
}
