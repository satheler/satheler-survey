import { HttpRequest, HttpResponse } from '../../contracts/http'
import { MissingParamError } from '../errors/MissingParamError'
import { badRequest } from '../helpers/HttpHelper'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
