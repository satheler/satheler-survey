import { HttpRequest, HttpResponse } from '../../contracts/http'
import { MissingParamError } from '../errors/MissingParamError'
import { badRequest } from '../helpers/HttpHelper'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError('name'))
    }

    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError('email'))
    }
  }
}
