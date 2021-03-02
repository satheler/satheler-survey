import { HttpResponse } from '../../contracts/http'

export const badRequest = (error: Error | Error[]): HttpResponse => ({
  statusCode: 400,
  body: error
})
