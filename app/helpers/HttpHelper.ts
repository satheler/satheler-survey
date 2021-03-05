import { HttpResponse, HttpResponseHelper } from '../../contracts'
import { InternalServerError } from '../errors'

export const httpResponseHelper: HttpResponseHelper = {
  ok: (body?: any): HttpResponse => ({
    statusCode: 200,
    body
  }),

  badRequest: (error: Error | Error[]): HttpResponse => ({
    statusCode: 400,
    body: error
  }),

  internalServerError: (): HttpResponse => ({
    statusCode: 500,
    body: new InternalServerError()
  })
}
