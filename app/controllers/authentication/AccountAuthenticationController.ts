import { Controller, ControllerContext, HttpResponse } from '../../../contracts'
import { MissingParamError } from '../../errors'

export class AccountAuthenticationController implements Controller {
  async handle ({ request, response }: ControllerContext): Promise<HttpResponse> {
    return response.badRequest(new MissingParamError('email'))
  }
}
