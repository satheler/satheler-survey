import { Controller } from '../../contracts/controller'
import { HttpRequest, HttpResponse } from '../../contracts/http'
import { EmailValidator } from '../../contracts/validator'
import { InternalServerError } from '../errors/InternalServerError'
import { InvalidParamError } from '../errors/InvalidParamError'
import { MissingParamError } from '../errors/MissingParamError'
import { badRequest } from '../helpers/HttpHelper'

export class SignUpController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator
  ) { }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'password_confirmation']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: new InternalServerError()
      }
    }
  }
}
