import { RequestHandler } from 'express'
import { Controller, HttpRequest } from '../../contracts'
import { httpResponseHelper } from '../../app/helpers/HttpHelper'

export const adaptRoute = (controller: Controller): RequestHandler => {
  return async (request, response) => {
    const httpRequest: HttpRequest = {
      body: request.body
    }

    const httpResponse = await controller.handle({
      request: httpRequest,
      response: httpResponseHelper
    })

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      response.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      response.status(httpResponse.statusCode).json({
        message: httpResponse.body.message
      })
    }
  }
}
