import { HttpResponse, HttpResponseHelper } from '../../contracts'
import { InternalServerError, UnauthorizedError } from '../errors'

export const httpResponseHelper: HttpResponseHelper = {
  ok: (body?: any): HttpResponse => ({
    statusCode: 200,
    body
  }),

  badRequest: (error: Error | Error[]): HttpResponse => ({
    statusCode: 400,
    body: error
  }),

  unauthorized: (): HttpResponse => ({
    statusCode: 401,
    body: new UnauthorizedError()
  }),

  internalServerError: (): HttpResponse => ({
    statusCode: 500,
    body: new InternalServerError()
  })
}
