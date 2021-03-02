import { HttpResponse } from '../../contracts/http'
import { InternalServerError } from '../errors/InternalServerError'

export const badRequest = (error: Error | Error[]): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const internalServerError = (): HttpResponse => ({
  statusCode: 500,
  body: new InternalServerError()
})
