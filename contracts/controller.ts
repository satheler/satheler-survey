import { HttpRequest, HttpResponse } from './http'

export type AvailableHttpResponseTypes = 'ok' | 'badRequest' | 'internalServerError'
export type HttpResponseHelperResponse = (...params: any) => HttpResponse
export type HttpResponseHelper = Record<AvailableHttpResponseTypes, HttpResponseHelperResponse>

export type ControllerContext = {
  request: HttpRequest
  response: HttpResponseHelper
}
export interface Controller {
  handle: (context: ControllerContext) => Promise<HttpResponse>
}
